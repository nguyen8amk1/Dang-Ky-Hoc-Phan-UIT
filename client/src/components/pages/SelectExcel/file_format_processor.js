import { HTMLCalendarParser, startTime2TietMapping, endTime2TietMapping, arrayToTkbObject, sheetJSFT, toDateTimeString } from './utils';
import XLSX from 'xlsx';

export const UIT_xlsxFileProcessing = (e, rABS, setDataExcel, file) => {
    // TODO: this is the excel parsing code, 
    // very specific format processing of UIT excel file 
    // A huge dependency exist between useTkbStore and setTkbStore, setDataExcel
    // and the whole system is based on these 2 functions
    // Need someway to hotwap these functions and any other functions in this dependency chain
    const bstr = e?.target?.result
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" })
    const wsLyThuyet = wb.Sheets[wb.SheetNames[0]]
    const wsThucHanh = wb.Sheets[wb.SheetNames[1]]
    const dataLyThuyet = XLSX.utils.sheet_to_json(wsLyThuyet, { header: 1 })
    const dataThucHanh = XLSX.utils.sheet_to_json(wsThucHanh, { header: 1 })
    const dataInArray = [...dataLyThuyet, ...dataThucHanh].filter(
        // những row có cột 0 là STT (STT là number) thì mới là data ta cần
        row => typeof row[0] === "number"
    );
    if (!dataInArray.length) return false;
    setDataExcel({
        data: dataInArray.map(array => arrayToTkbObject(array)),
        fileName: file.name,
        lastUpdate: toDateTimeString(new Date())
    }); 
}

const outputCorrectFormat = (schedule) => {
    // NOTE: we have
    // color
    // description
    // endDate
    // endTime
    // gap
    // name
    // startDate
    // startTime
    // weekday 
    //
    // we need 
    //
    // MaLop, 
    // NgonNgu, 
    // TenMH, 
    // TenGV, 
    // PhongHoc, 
    // NBD, -- ngay bat dau  
    // NKT, -- ngay ket thuc 
    // Thu,
    // Tiet
    // -> Pretty good 
    const result = [];

    for(let i = 0; i < schedule.length; i++) {
        const entry = schedule[i];
        console.log(entry);

        let tietEnd = endTime2TietMapping[entry.endTime]; 
        let tietStart = startTime2TietMapping[entry.startTime]; 

        result.push({
            MaLop: "ditme", 
            NgonNgu: "saigon", 
            TenMH: entry.name, 
            TenGV: "ditmesaigon", 
            PhongHoc: "khong the nao", 
            NBD: entry.startDate, 
            NKT: entry.endDate,
            Thu: entry.weekday,
            Tiet: Array(tietEnd - tietStart + 1).fill().map((element, index) => index + tietStart - 1).join('')
        });
    }
    
    return result;
}

export const UIT_htmlFileProcessing = (e, rABS, setDataExcel, file) => {
    const htmlText = e.target.result;
    console.log(htmlText);

    const calendarParser = new HTMLCalendarParser();
    calendarParser.setData(htmlText);

    const schedule = calendarParser.parse();

    localStorage.setItem("raw-format-schedule", JSON.stringify(schedule));
    console.log(schedule);
    
    setDataExcel({
        data: outputCorrectFormat(schedule),
        fileName: file.name,
        lastUpdate: toDateTimeString(new Date())
    }); 
}
