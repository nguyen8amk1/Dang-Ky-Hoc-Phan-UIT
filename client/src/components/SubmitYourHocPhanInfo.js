// TODO: design the hoc phan info behaviour in xstate editor 
import React, { useState } from 'react';
import {maLop2LichThi, extractInputStrings, parseCourseInfo} from '../utils'; 
import {tietStartTimeMapping, tietEndMapping} from '../pages/SelectExcel/utils';
import {outputCorrectFormat} from '../pages/SelectExcel/file_format_processor.js';
import { useTkbStore } from '../utils/zus';


const convertDateFormat = (date) => {
    // Split the input date by hyphen
    const [day, month, year] = date.split('-');
    
    // Extract the last two digits of the year
    const shortYear = year.slice(-2);
    
    // Create the new date format
    const newDate = `${day}/${month}/${shortYear}`;
    
    return newDate;
}

const outputCorrectLichThiFormat = (lichthi) => {
    const convert = (mon) => {
        return {
            malop: mon.MaLop,
            phonghoc: mon.PhongThi, 
            name: mon.TenMonHoc,
            startDate: convertDateFormat(mon.NgayThi),
            endDate: convertDateFormat(mon.NgayThi),
            // FIXME: this starttime and endtime is not correct for generating google calendar
            // since thoi gian thi not cleanly map to tiet 
            startTime: tietStartTimeMapping[parseInt(mon.Tiet[0])-1], 
            endTime: tietEndMapping[parseInt(mon.Tiet[mon.Tiet.length-1])-1], 
            gap: 1, 
            description: "Ngủ quên là rớt chết mẹ ráng chịu",
            color: 11, 
            weekday: mon.Thu
        }
    }; 

    let correctFormat = [];
    lichthi.forEach(mon => {
        correctFormat = correctFormat.concat(convert(mon));
    });
    return correctFormat;
}

function SubmitYourHocPhanInfo({setGoodSubmittedInfoEvent}) {
    const [info, setInfo] = useState('Submit your thong tin dkhp');
    const setDataExcel = useTkbStore((s) => s.setDataExcel);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('info submitted:', info);

        const inputStrings = extractInputStrings(info);
        console.log("Input strings: ", inputStrings);
        //console.log("set good submitted info ");
        const goodInputString = inputStrings.length > 0;
        setGoodSubmittedInfoEvent(goodInputString);

        if(!goodInputString) return;

        const courseInfos = inputStrings.map(inputString => {
            try {
                return parseCourseInfo(inputString); 
            } catch (e) {
                return null;
            }
        }).filter(course => course);

        localStorage.setItem("courseInfo", JSON.stringify(courseInfos));
        const lichthibody = JSON.parse(localStorage.getItem('lichthibody')).lich_thi_body;

        let matchedLops = [];
        courseInfos.forEach(course => {
            const matches = maLop2LichThi(course.classCode, lichthibody);
            console.log(matches);
            if (matches.length > 0) {
                matchedLops = matchedLops.concat(matches);
            }
        });

        const schedule = outputCorrectLichThiFormat(matchedLops);
        console.log(schedule);

        // console.log(courseInfos);
        // console.log(matchedLops);

        // TODO: do the matching between the courseInfo with the 

        localStorage.setItem("raw-lichthi-schedule", JSON.stringify(schedule));
        //console.log(schedule);
        //
        const correctedFormatSchedule = outputCorrectFormat(schedule);
        setDataExcel({
            data: correctedFormatSchedule,
            //fileName: file.name,
            fileName: "something",
            //lastUpdate: toDateTimeString(new Date())
            lastUpdate: "something"
        }); 

        //setLichThiHaveBeenGeneratedEvent(correctedFormatSchedule.length > 0);

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="w3info">Submit your THONG TIN DKHP</label>
                </p>
                <textarea
                    rows="40"
                    cols="100"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default SubmitYourHocPhanInfo;
