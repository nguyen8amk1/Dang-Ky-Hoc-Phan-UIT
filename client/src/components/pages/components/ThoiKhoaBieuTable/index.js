import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { IconButton, Tooltip } from "@mui/material"
import clsx from "clsx"
import { useLocation } from "react-router-dom"
import ImageIcon from "@mui/icons-material/Image"
import { useState } from "react"

//import { ROUTES } from "../../../constants"
import { getDanhSachTiet } from "../../../utils"
//import { selectIsChiVeTkb, useTkbStore } from "../../../zus"
import { useTkbStore } from "../../../zus"
import ClassCell, { ClassCellContext } from "./ClassCell"
import TableHead from "./TableHead"
import {
    CELL,
    PhanLoaiHocTrenTruongContext,
    usePhanLoaiHocTrenTruongContext,
    useProcessImageTkb
} from "./hooks"
import "./styles.css"
import { timeLookup } from "./utils"

const GetCell = ({ data }) => {
    if (data === CELL.NO_CLASS) return <td />; 
    if (data === CELL.OCCUPIED) return null; 
    return <ClassCell data={data} rowSpan={getDanhSachTiet(data.Tiet).length} />
}

function RowHocTrenTruong({ row, index }) {
    return (
        <tr>
            <td className="cell-tiet">
                Tiết {index + 1} <br />
                {timeLookup[index]}
            </td>
            {[2, 3, 4, 5, 6, 7, 8].map(t => (
                (t < 8) ? <GetCell key={t} data={row["Thu" + t]} />
                : <GetCell key={t} data={row["CN"]} />
            ))}
        </tr>
    )
}

// NOTE: this is just a temporary function
const html2RowDataHocTrenTruong = () => {
    // TODO: parse the TKB HTML in here
    
    return [
        {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": {
                "STT": 32,
                "MaMH": "MA006",
                "MaLop": "MA006.O21.CLC",
                "TenMH": "Giải tích",
                "MaGV": "80508",
                "TenGV": "Nguyễn Văn Hợi",
                "SiSo": "40(0)",
                "SoTc": 4,
                "ThucHanh": 0,
                "HTGD": "LT",
                "Thu": "6",
                "Tiet": "1234",
                "CachTuan": "1",
                "PhongHoc": "C101",
                "KhoaHoc": "0",
                "HocKy": "2",
                "NamHoc": "2023",
                "HeDT": "CLC",
                "KhoaQL": "BMTL",
                "NBD": "2024-02-19",
                "NKT": "2024-06-08",
                "NgonNgu": "VN"
            },
            "Thu7": {
                "STT": 31,
                "MaMH": "MA005",
                "MaLop": "MA005.O21.CLC",
                "TenMH": "Xác suất thống kê",
                "MaGV": "80048",
                "TenGV": "Dương Ngọc Hảo",
                "SiSo": "40(0)",
                "SoTc": 3,
                "ThucHanh": 0,
                "HTGD": "LT",
                "Thu": "7",
                "Tiet": "1234",
                "CachTuan": "1",
                "PhongHoc": "*",
                "KhoaHoc": "0",
                "HocKy": "2",
                "NamHoc": "2023",
                "HeDT": "CLC",
                "KhoaQL": "BMTL",
                "NBD": "2024-02-19",
                "NKT": "2024-05-11",
                "NgonNgu": "VN"
            }, 
            "CN": null, 
        },
        {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": "xx",
            "Thu7": "xx", 
            "CN": null, 
        },
        {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": "xx",
            "Thu7": "xx", 
            "CN": null, 
        },
        {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": "xx",
            "Thu7": "xx", 
            "CN": null
        },
        {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null, 
            "CN": null
        },
        {
            "Thu2": {
                "STT": 35,
                "MaMH": "IT002",
                "MaLop": "IT002.O21.CLC.1",
                "TenMH": "Lập trình hướng đối tượng",
                "SiSo": "20(0)",
                "SoTc": 1,
                "ThucHanh": 1,
                "HTGD": "HT1",
                "Thu": "2",
                "Tiet": "67890",
                "CachTuan": "2",
                "PhongHoc": "B3.02",
                "KhoaHoc": "0",
                "HocKy": "2",
                "NamHoc": "2023",
                "HeDT": "CLC",
                "KhoaQL": "CNPM",
                "NBD": "2024-03-04",
                "NKT": "2024-06-01",
                "NgonNgu": "VN"
            },
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null, 
            "CN": null
        },
        {
            "Thu2": "xx",
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null, 
            "CN": null
        },
        {
            "Thu2": "xx",
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null, 
            "CN": null
        },
        {
            "Thu2": "xx",
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null, 
            "CN": null
        },
        {
            "Thu2": "xx",
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null,
            "CN": null
        }
    ]
}

function Render() {
    // const {
    //     //rowDataHocTrenTruong,
    //     //khongHocTrenTruong,
    //     //redundant
    // } = 
    // usePhanLoaiHocTrenTruongContext();

    // FIXME: this is just a hack, please make it work properly  
    // something wrong happens with the usePhanLoaiHocTrenTruongContext, 
    // all the variable gets from it are undefined 
    
    console.log("FIXME: this is just a hack, to get the tkb rendered");

    // TODO: almost everything depends on the rowDataHocTrenTruong
    // -> the OCCUPIED blocks gonna be filled with class data -> and things gonna work
    // -> other things doesn't matter
    
    const rowDataHocTrenTruong = html2RowDataHocTrenTruong();

    const location = useLocation()
    //const isChiVeTkb = useTkbStore(selectIsChiVeTkb)
    const {
        tkbTableRef,
        saveTkbImageToComputer,
        copyTkbImageToClipboard
    } = useProcessImageTkb()

    // const isInStep2 = location.pathname === ROUTES._2XepLop.path
    //
    // const [areExtraButtonsShown, setAreExtraButtonsShown] = useState(false)
    //
    // // TODO: refactor the messy flow after writing tests
    // if (isInStep2 && isChiVeTkb) {
    //   return (
    //     <h3 style={{ textAlign: "center", padding: 20 }}>
    //       {location.search.includes("self_selected") ? (
    //         <>
    //           Preview bị disable ở chế độ chia sẻ TKB{" "}
    //           <code style={{ whiteSpace: "nowrap" }}>?self_selected=</code>, sang
    //           tab Bước 3 để xem TKB
    //         </>
    //       ) : (
    //         `Bạn đang chọn "Tự chuẩn bị danh sách mã lớp" ở tab Bước 3`
    //       )}
    //     </h3>
    //   )
    // }

    return (
        <ClassCellContext>
            <div
                id="thoi-khoa-bieu"
                //className={clsx({ compact: isInStep2 })}
                //onMouseEnter={() => setAreExtraButtonsShown(true)}
                //onMouseLeave={() => setAreExtraButtonsShown(false)}
            >
                <div
                    className={clsx("extra-buttons", {
                        //"extra-buttons-shown": areExtraButtonsShown
                    })}
                >
                    <Tooltip title="Tải hình ảnh TKB về máy" placement="left">
                        <IconButton onClick={saveTkbImageToComputer} color="primary">
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Sao chép hình ảnh TKB vào clipboard" placement="left">
                        <IconButton onClick={copyTkbImageToClipboard} color="primary">
                            <ImageIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <div style={{ display: "flex" }}>
                    {/* {redundant */}
                    {/*     .flatMap(it => it.new) */}
                    {/*     .map((lop, index) => ( */}
                    {/*         <tr key={index}> */}
                    {/*             <ClassCell data={lop} isOutsideTable /> */}
                    {/*         </tr> */}
                    {/*     ))} */}
                </div>
                {/* <table ref={tkbTableRef}> */}
                <table>
                    <TableHead />
                    <tbody>
                        {rowDataHocTrenTruong.map((row, index) => (
                            <RowHocTrenTruong key={index} row={row} index={index} />
                        ))}

                        {/* {khongHocTrenTruong.map((lop, index) => ( */}
                        {/*     <tr key={index}> */}
                        {/*         <ClassCell colSpan={7} data={lop} /> */}
                        {/*     </tr> */}
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </ClassCellContext>
    )
}

function Index() {
    return (
        <ClassCellContext>
            <Render />
            {/* <PhanLoaiHocTrenTruongContext> */}
            {/*   <Render /> */}
            {/* </PhanLoaiHocTrenTruongContext> */}
        </ClassCellContext>
    )
}

export default Index
