import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

// import { closeSnackbar, enqueueSnackbar } from 'notistack';
import React from 'react';
import XLSX from 'xlsx';
import { selectDataExcel, useTkbStore } from '../../zus';
// import { tracker } from '../..';
import { HTMLCalendarParser, arrayToTkbObject, sheetJSFT, toDateTimeString } from './utils';

const Bold = ({ children }) => <b style={{ marginLeft: 5 }}>{children}</b>;

const UIT_xlsxFileProcessing = (e, rABS, setDataExcel, file) => {
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
const array = []; 
  return {
    // STT: array[0],
    // MaMH: array[1],
    // MaLop: array[2],
    // TenMH: array[3],
    // MaGV: array[4],
    // TenGV: array[5],
    // SiSo: array[6],
    // SoTc: parseInt(array[7]),
    // ThucHanh: array[8],
    // HTGD: array[9],
    // Thu: String(array[10]),
    // Tiet: String(array[11]),
    // CachTuan: String(array[12]),
    // PhongHoc: array[13],
    // KhoaHoc: String(array[14]),
    // HocKy: String(array[15]),
    // NamHoc: String(array[16]),
    // HeDT: array[17],
    // KhoaQL: array[18],
    // NBD:
    //   typeof array[19] === "string"
    //     ? array[19]
    //     : convertExcelDateToStringDate(array[19]),
    // NKT:
    //   typeof array[20] === "string"
    //     ? array[20]
    //     : convertExcelDateToStringDate(array[20]),
    // GhiChu: array[21],
    // NgonNgu: array[22]
  }
}

const UIT_htmlFileProcessing = (e, rABS, setDataExcel, file) => {
    const htmlText = e.target.result;
    console.log(htmlText);

    const calendarParser = new HTMLCalendarParser();
    calendarParser.setData(htmlText);

    const schedule = calendarParser.parse();
    console.log(schedule);
    // TODO: convert the schedule format to the format that works with the current system, 
    // in the outputCorrectFormat() function
    
    setDataExcel({
        //data: outputCorrectFormat(schedule),
        fileName: file.name,
        lastUpdate: toDateTimeString(new Date())
    }); 
}

//const currentFileProcessing = UIT_xlsxFileProcessing;
const currentFileProcessing = UIT_htmlFileProcessing;

function SelectExcelButton() {
    const dataExcel = useTkbStore(selectDataExcel) || {};
    //const dataExcel = {};
    const setDataExcel = useTkbStore((s) => s.setDataExcel);

    const handleUploadFileExcel = React.useCallback(
        // TODO: currently there are no checking of the excel content format 
        // just upload any excel file will work
        event => {
            const file = event.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            const rABS = !!reader.readAsBinaryString
            reader.onload = e => {
                const success = currentFileProcessing(e, rABS, setDataExcel, file);
                if(success) {
                    // enqueueSnackbar(
                    //     <>
                    //         Upload file thành công <Bold>{file.name}</Bold>
                    //     </>,
                    //     {
                    //         variant: "success",
                    //         action: key => (
                    //             <Button
                    //                 size="small"
                    //                 color="inherit"
                    //                 onClick={() => {
                    //                     closeSnackbar(key)
                    //                 }}
                    //             >
                    //                 Đã hiểu
                    //             </Button>
                    //         )
                    //     }
                    // )
                    // tracker.track("[page1] upload_excel_resulted", {
                    //     success: true,
                    //     fileName: file.name
                    // })
                } else {
                    // enqueueSnackbar("Không đúng định dạng file của trường", {
                    //     variant: "error"
                    // })
                    //tracker.track("[page1] upload_excel_resulted", { success: false })
                }
            }

            //FIXME: different files format use different reader, try some way to abstract this out, ASAP
            console.log('FIXME: different files format use different reader, try some way to abstract this out, ASAP');
            // if (rABS) reader.readAsBinaryString(file)
            // else if() reader.readAsArrayBuffer(file)
            // else reader.readAsText(file, 'UTF-8');
            reader.readAsText(file, 'UTF-8');

        },
        [setDataExcel]
    )
    console.log(dataExcel);

    return (
        <Box mt={1} mb={2}>
            {/* File uploader with material-ui: https://stackoverflow.com/a/54043619/9787887*/}
            <Tooltip title={dataExcel.fileName || 'Chưa upload file'}>
                <Button
                    variant={'contained'}
                    color={dataExcel.lastUpdate ? 'success' : 'primary'}
                    component="label"
                    style={dataExcel.lastUpdate ? undefined : { fontWeight: 'bold' }}
                >
                    {dataExcel?.lastUpdate ? (
                        <>
                            <span>Đã upload: </span> <Bold>{dataExcel.lastUpdate}</Bold>
                        </>
                    ) : (
                            'Upload file excel'
                        )}
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept={sheetJSFT}
                        acceptCharset="UTF-8" // Add this line
                        onChange={handleUploadFileExcel}
                        onClick={() => {
                            // tracker.track('[page1] btn_upload_excel_clicked');
                        }}
                    />
                </Button>
            </Tooltip>
            <span style={{ marginLeft: '10px' }}>
                Ví dụ file excel{' '}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://daa.uit.edu.vn/thong-bao-lich-dkhp-va-tkb-du-kien-hk2-nam-hoc-2023-2024"
                    onClick={() => {
                        // tracker.track('[page1] link_excel_hk2_2023_2024_original_clicked');
                    }}
                >
                    chính quy HK2 2023-2024
                </a>
                :{' '}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRyf8-kMRTo4CllfPA4sjbjxkhGhR1tT7yD1HASjmClqTwwkJBgWRvuxJPIAK8Wdw/pub?output=xlsx"
                    onClick={() => {
                        // tracker.track('[page1] link_excel_hk2_2023_2024_clicked');
                    }}
                >
                    TKB_dự kiến_HK2 2023-2024_29-12-2023_Copied.xlsx
                </a>{' '}
            </span>
        </Box>
    );
}

export default SelectExcelButton;
