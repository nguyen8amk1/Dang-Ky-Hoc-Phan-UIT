// TODO: design the hoc phan info behaviour in xstate editor 
import React, { useState } from 'react';
import {maLop2LichThi, extractInputStrings, parseCourseInfo} from '../components/../../utils'; 
import {tietStartTimeMapping, tietEndMapping} from '../SelectExcel/utils';

/*
 *
 *
 *
 *
 * *{
  "data": [
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "Quản trị mạng và hệ thống - NT132.O12.ATCL - EN",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "11/09/23",
      "NKT": "30/12/23",
      "Thu": 2,
      "Tiet": "012"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "Lập trình ứng dụng Web - NT208.O13.ATCL - VN",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "11/09/23",
      "NKT": "25/11/23",
      "Thu": 5,
      "Tiet": "012"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "An toàn mạng - NT140.O12.ATCL - VN",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "11/09/23",
      "NKT": "30/12/23",
      "Thu": 6,
      "Tiet": "012"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "Phân tích và thiết kế thuật toán - CS112.O11.KHCL - VN",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "11/09/23",
      "NKT": "30/12/23",
      "Thu": 7,
      "Tiet": "012"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "Chủ nghĩa xã hội khoa học - SS009.O12 - VN",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "11/09/23",
      "NKT": "30/12/23",
      "Thu": 4,
      "Tiet": "34"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "Quản trị mạng và hệ thống - NT132.O12.ATCL.2 - EN(HT1) - (Cách 2 tuần)",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "02/10/23",
      "NKT": "30/12/23",
      "Thu": 2,
      "Tiet": "56789"
    },
    {
      "MaLop": "ditme",
      "NgonNgu": "saigon",
      "TenMH": "An toàn mạng - NT140.O12.ATCL.2 - VN(HT1) - (Cách 2 tuần)",
      "TenGV": "ditmesaigon",
      "PhongHoc": "khong the nao",
      "NBD": "02/10/23",
      "NKT": "30/12/23",
      "Thu": 6,
      "Tiet": "56789"
    }
  ],
  "fileName": "Lịch TKB - Lịch thi _ Cổng thông tin đào tạo1.html",
  "lastUpdate": "22:24 21/05/2024"
}
*/




function SubmitYourHocPhanInfo() {
    const [info, setInfo] = useState('Submit your thong tin dkhp');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('info submitted:', info);

        const inputStrings = extractInputStrings(info);
        console.log(inputStrings);

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

        // console.log(courseInfos);
        // console.log(matchedLops);

        // TODO: do the matching between the courseInfo with the 

        /* TODO: Modify this to match our needs, 
         *  we just need a good schedule and everything will work 
         *  **our current format
        {
            "MaMonHoc": "CS105",
            "TenMonHoc": "Đồ họa máy tính",
            "MaLop": "CS105.O21.KHCL",
            "NgayThi": "27-06-2024",
            "Thu": "5",
            "CaThi": 3,
            "Tiet": "678",
            "PhongThi": "C112",
            "HocKi": "2",
            "NamHoc": "2023-2024"
}         *
         *  **schedule format
         *[
    {
        (optional) malop: ,  -> MaLop
        (optional) phonghoc: -> PhongThi
        name: "", [X] -> TenMonHoc
        startDate: "11/09/23", -> NgayThi
            TODO: change from 27-06-2024 to 27/09/24 format 
        endDate: "30/12/23", -> NgayThi
        startTime: "07:30:00", 
        endTime: "09:45:00", 
           ->  TODO: 
            NOTE: Tiet should start from 0 to n
            startTime = tietStartTimeMapping[Tiet[0]]; // 
            endTime = tietEndMapping[Tiet[Tiet.length-1]]; // 

        gap: 1, 
        description: "Ngủ quên là rớt chết mẹ ráng chịu",
        color: 11, 
        weekday: -> Thu 
    },
]
            const schedule = calendarParser.parse();

            localStorage.setItem("raw-lichthi-schedule", JSON.stringify(schedule));
            console.log(schedule);
            
            setDataExcel({
                data: outputCorrectFormat(schedule),
                fileName: file.name,
                lastUpdate: toDateTimeString(new Date())
            }); 
        */
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="w3info">Submit your THONG TIN DKHP</label>
                </p>
                <textarea
                    id="w3info"
                    name="w3info"
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
