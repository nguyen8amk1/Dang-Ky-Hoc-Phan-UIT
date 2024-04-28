import * as cheerio from 'cheerio';

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




const SERIOUS_COLORS = [11, 6, 4, 5, 3, 7, 1, 9, 2, 10, 8];
// NOTE: tiet starting from 0, to exclusive n, meaning -1 from the real tiet 
const tietStartTimeMapping = ["07:30:00", "08:15:00", "09:00:00", "10:00:00", "10:45:00", "13:00:00", "13:45:00", "14:30:00", "15:30:00", "16:15:00"]; 
const tietEndMapping =       ["08:15:00", "09:00:00", "09:45:00", "10:45:00", "11:30:00", "13:45:00", "14:30:00", "15:15:00", "16:15:00", "17:00:00" ]; 

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

export class HTMLCalendarParser {
    constructor() {
        this.data = null;
    }


    _parseSubjectInformationFromHTML(htmlString) {
        const textArray = htmlString.split('<br>');
        const cleanedTextArray = textArray.map(item => item.trim());
        const finalTextArray = cleanedTextArray.filter(item => item !== '')
        return finalTextArray;
    }

    _generateTKB($, selectorTKBTable, allTrs) {
        const tkb = [];
        allTrs.each((index, element) => {
            const alltds = $(`${selectorTKBTable} > tbody > tr:nth-child(${index + 1}) > td`);
            const newArray = [];
            tkb.push(newArray);

            let colorIndex = 0;
            alltds.each((tdindex, td) => {
                const ystart = index;
                const yend = ystart + parseInt($(td).attr("rowspan"));
                const mamon = $(td).children("strong");

                let name = "";
                let startDate = "";
                let endDate = "";
                let startTime = "";
                let endTime = "";
                let gap = "";
                let description = "";
                let color; 

                let good = 0;
                if(mamon.length > 0)  {
                    const htmlString = $(td).html();
                    const parsedSubjectInfo = this._parseSubjectInformationFromHTML(htmlString); 

                    if(parsedSubjectInfo.length == 6) {
                        //console.log(parsedSubjectInfo);
                        //console.log(mamon.text());

                        name = `${parsedSubjectInfo[2]} - ${mamon.text()}`; // ten + mamon

                        const dateExtractFromString = (inputString) => {
                            const colonIndex = inputString.indexOf(':');
                            const dateInformation = inputString.slice(colonIndex + 1);
                            return dateInformation;
                        }

                        startDate = dateExtractFromString(parsedSubjectInfo[4]);
                        endDate = dateExtractFromString(parsedSubjectInfo[5]);


                        startTime = tietStartTimeMapping[ystart]; // 
                        endTime = tietEndMapping[yend-1]; // 

                        const extractGapFromMaMon = (inputString) => {
                            const regex = /\(Cách (\d+) tuần\)/;
                            const match = inputString.match(regex);

                            if (match && match[1]) {
                                return parseInt(match[1], 10);
                            } else {
                                return 1;
                            }
                        }

                        gap = extractGapFromMaMon(mamon.text());
                        description = `${parsedSubjectInfo[3]} - ${mamon.text()} - ${parsedSubjectInfo[1]}`; // phong hoc 3 + si so 1

                        color = SERIOUS_COLORS[colorIndex]; 

                        good = 1 && startTime && endTime; 
                        colorIndex++;
                    }

                }


                newArray.push({
                    // NOTE: these 3 information are for booleanTable calculation 
                    good: good, 

                    ystart: ystart, 
                    yend: yend, 

                    // NOTE: the information from now on is not related to the upper one 
                    name: name,
                    startDate: startDate,
                    endDate: endDate,

                    startTime: startTime,
                    endTime: endTime,

                    gap: gap,
                    description: description,
                    color: color,
                });
            });
        });

        return tkb;
    }

    _generateEventFromTKB(tkb) {
        const booleanTable = Array.from({ length: 11 }, () => Array(6).fill(1));
        const fillFromTo = (booleanTable, i, from, to) => {
            for(let j = from; j < to; j++) {
                booleanTable[j][i] = 0; 
            }
        }

        const fillBooleanTableAccordingToTKB = () => {
            for(let i = 0; i < booleanTable.length; i++) {
                let x = 0; 
                let previousX = -1; 
                for(let j = 0; j < booleanTable[i].length; j++) {
                    x += booleanTable[i][j]; 
                    if(x !== previousX) {
                        const subject = tkb[i][x];

                        if(subject && subject.good) {
                            subject.weekday = j + 2; 
                            fillFromTo(booleanTable, j, subject.ystart, subject.yend);
                        }
                        previousX = x; 
                    }
                }
            }
        }

        fillBooleanTableAccordingToTKB();
        const finalResults = [];
        for(let i = 0; i < tkb.length; i++) {
            for(let j = 0; j < tkb[i].length; j++) {
                if(tkb[i][j].good) { 
                    delete tkb[i][j].good; 
                    delete tkb[i][j].ystart; 
                    delete tkb[i][j].yend; 
                    finalResults.push(tkb[i][j]); 
                } 
            }
        }
        return finalResults; 
    }


    _generateEventFromTkbHTML(htmlText) {
        const html = htmlText;
        const $ = cheerio.load(html);

        const selectorTKBTable = '#uit-tracuu-tkb-data > div > table.sticky-enabled.tableheader-processed.sticky-table';
        const allTrs = $(`${selectorTKBTable} > tbody tr`);

        const tkb = this._generateTKB($, selectorTKBTable, allTrs);
        const finalResults = this._generateEventFromTKB(tkb);
        return finalResults;
    }


    setData(data) {
        // TODO: data type checking 
        this.data = data; 
    }

    parse() {
        //const tkbhtmlPath = "tkbhk1.html";
        if(!this.data) throw new Error("There are not data to parse");
        const result = this._generateEventFromTkbHTML(this.data);
        return result;
    }
}
