// TODO: design the hoc phan info behaviour in xstate editor 
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {maLop2LichThi, extractInputStrings, parseCourseInfo} from '../utils'; 
import {tietStartTimeMapping, tietEndMapping} from '../pages/SelectExcel/utils';
import {outputCorrectFormat} from '../pages/SelectExcel/file_format_processor.js';
import { useTkbStore } from '../utils/zus';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import {Backdrop, TextField, Box, Container, Typography, Grid, Button} from '@mui/material';
// import Backdrop from '@mui/material/Backdrop';
// import TextField from '@mui/material/TextField';

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



function SubmitYourHocPhanInfo({lichThiHaveBeenGenerated, setGoodSubmittedInfoEvent, setWantToSeePreviouslyCreatedCalendarEvent}) {
    const navigate = useNavigate();
    const [info, setInfo] = useState('');
    const setDataExcel = useTkbStore((s) => s.setDataExcel);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('info submitted:', info);

        const inputStrings = extractInputStrings(info);
        console.log("Input strings: ", inputStrings);
        //console.log("set good submitted info ");
        const goodInputString = inputStrings.length > 0;
        console.log("set good submitted info event " + goodInputString)
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

        console.log("Matched Lops", matchedLops);

        // NOTE: process the matchedLops once again, 
        //  to merge all the classCode duplicates 
        const mergedLops = matchedLops.reduce((acc, current) => {
            // Find if the "MaLop" already exists in the accumulator
            const existing = acc.find(item => item.MaLop === current.MaLop);
            
            if (existing) {
                // Concatenate the current "PhongThi" value with existing value
                existing.PhongThi += `, ${current.PhongThi}`;
            } else {
                // If the "MaLop" doesn't exist, add the current object
                acc.push({ ...current });
            }
            
            return acc;
        }, []);

        console.log(mergedLops);

        const schedule = outputCorrectLichThiFormat(mergedLops);
        console.log(schedule);

        // console.log(courseInfos);
        // console.log(matchedLops);

        localStorage.setItem("raw-format-schedule", JSON.stringify(schedule));
        //console.log(schedule);
        
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

    const handleGoBackHome = () => {
        navigate('/');
    }

    const handleShowPreviouslyCreatedCalendar= () => {
        setWantToSeePreviouslyCreatedCalendarEvent(true);
    }

    return (
        <>
            <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    margin: '3em'
                }}
            >
                <Grid item>
                    {/* TODO: when clicked remove the generatedCalendar and submittedfile and navigate to the gcg/step1-html-upload*/}
                    <Button size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }} onClick={handleGoBackHome} >Go back home</Button>
                </Grid>


                <Grid item>
                    <Button disabled={!lichThiHaveBeenGenerated} size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }} onClick={handleShowPreviouslyCreatedCalendar}>Previously created calendar</Button>
                </Grid>
            </Grid>




            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="w3info">Submit your THONG TIN DKHP</label>
                </p>
                <TextField
                    sx={{ m: 1, width: '100ch'}}
                    id="outlined-textarea"
                    label="Thông tin Đăng Ký học phần"
                    placeholder="Copy Paste Thông tin Đăng Ký học phần của bạn vào đây"
                    rows={20}
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    multiline
                    />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default SubmitYourHocPhanInfo;
