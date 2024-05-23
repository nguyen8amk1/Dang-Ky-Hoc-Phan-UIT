export function arrayToTkbObject(array) {
  // convert excel based date (1989-Dec-30) to Js based date (1970-Jan-01)
  function convertExcelDateToStringDate(excelDate) {
    // in Excel, based date is 1989-Dec-30: https://stackoverflow.com/questions/36378476/why-does-the-date-returns-31-12-1899-when-1-is-passed-to-it
    // @ts-ignore
    const offsetOfBases = new Date(0) - new Date(1899, 11, 31)
    const jsDate = new Date(excelDate * 24 * 60 * 60 * 1000 - offsetOfBases)
    return (
      jsDate.getFullYear() +
      "-" +
      (jsDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      jsDate
        .getDate()
        .toString()
        .padStart(2, "0")
    )
  }

  return {
    STT: array[0],
    MaMH: array[1],
    MaLop: array[2],
    TenMH: array[3],
    MaGV: array[4],
    TenGV: array[5],
    SiSo: array[6],
    SoTc: parseInt(array[7]),
    ThucHanh: array[8],
    HTGD: array[9],
    Thu: String(array[10]),
    Tiet: String(array[11]),
    CachTuan: String(array[12]),
    PhongHoc: array[13],
    KhoaHoc: String(array[14]),
    HocKy: String(array[15]),
    NamHoc: String(array[16]),
    HeDT: array[17],
    KhoaQL: array[18],
    NBD:
      typeof array[19] === "string"
        ? array[19]
        : convertExcelDateToStringDate(array[19]),
    NKT:
      typeof array[20] === "string"
        ? array[20]
        : convertExcelDateToStringDate(array[20]),
    GhiChu: array[21],
    NgonNgu: array[22]
  }
}

// from Date object to 'hh:mm dd/MM/yyyy' format
export function toDateTimeString(date) {
  return (
    date
      .getHours()
      .toString()
      .padStart(2, "0") +
    ":" +
    date
      .getMinutes()
      .toString()
      .padStart(2, "0") +
    " " +
    date
      .getDate()
      .toString()
      .padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear()
  )
}

// copied from: https://github.com/SheetJS/sheetjs/blob/master/demos/react/sheetjs.jsx#L134-L136
export const sheetJSFT = [
  ".xlsx",
  ".xlsb",
  ".xlsm",
  ".xls",
  ".html", // NOTE: added the file extensions in here 
  // '.xml',
  ".csv"
  // '.txt',
  // '.ods',
  // '.fods',
  // '.uos',
  // '.sylk',
  // '.dif',
  // '.dbf',
  // '.prn',
  // '.qpw',
  // '.123',
  // '.wb*',
  // '.wq*',
  // '.html',
  // '.htm',
].join(",")




// NOTE: tiet starting from 0, to exclusive n, meaning -1 from the real tiet 
export const tietStartTimeMapping = ["07:30:00", "08:15:00", "09:00:00", "10:00:00", "10:45:00", "13:00:00", "13:45:00", "14:30:00", "15:30:00", "16:15:00"]; 
export const tietEndMapping =       ["08:15:00", "09:00:00", "09:45:00", "10:45:00", "11:30:00", "13:45:00", "14:30:00", "15:15:00", "16:15:00", "17:00:00" ]; 

export const startTime2TietMapping = {
    "07:30:00": 1, 
    "08:15:00": 2, 
    "09:00:00": 3, 
    "10:00:00": 4, 
    "10:45:00": 5,  
    "13:00:00": 6, 
    "13:45:00": 7, 
    "14:30:00": 8, 
    "15:30:00": 9, 
    "16:15:00": 10
}

export const endTime2TietMapping = {
    "08:15:00": 1, 
    "09:00:00": 2, 
    "09:45:00": 3, 
    "10:45:00": 4, 
    "11:30:00": 5, 
    "13:45:00": 6, 
    "14:30:00": 7, 
    "15:15:00": 8, 
    "16:15:00": 9, 
    "17:00:00": 10
}
