import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { IconButton, Tooltip } from "@mui/material"
import clsx from "clsx"
import { useLocation } from "react-router-dom"
import ImageIcon from "@mui/icons-material/Image"
import { useState } from "react"

//import { ROUTES } from "../../../constants"
import { getDanhSachTiet } from "../../utils"
//import { selectIsChiVeTkb, useTkbStore } from "../../../zus"
import { useTkbStore, selectDataExcel } from "../../utils/zus"
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
const html2RowDataHocTrenTruong = (subjects) => {
    // TODO: try to use the function that he already wrote
    const result = []
    for(let i = 0; i < 10; i++) {
        const obj = {
            "Thu2": null,
            "Thu3": null,
            "Thu4": null,
            "Thu5": null,
            "Thu6": null,
            "Thu7": null,
            "CN": null,
        }
        result.push(obj);
    }

    // NOTE: the Tiet re-numbered from 0 to 9 -> for simplicity though :v  
    for(let i = 0;  i < subjects.length; i++) {
        console.log(subjects[i]);
        const thu = subjects[i].Thu; 
        const separatedTietDigits = subjects[i].Tiet.split('').map(Number);
        const tiet = separatedTietDigits[0];
        console.log(result[tiet][`Thu${thu}`]);
        result[tiet][`Thu${thu}`] = subjects[i];

        console.log(separatedTietDigits);
        for(let t = 1; t < separatedTietDigits.length; t++) {
            if(result[separatedTietDigits[t]]) {
                result[separatedTietDigits[t]][`Thu${thu}`] = CELL.OCCUPIED;
            }
        }
    }
    console.log(result);

    return result;
}

function Render() {
    const {
        //rowDataHocTrenTruong,
        //khongHocTrenTruong,
        //redundant
    } = usePhanLoaiHocTrenTruongContext();


    
    const dataExcel = useTkbStore(selectDataExcel);
    console.log(dataExcel.data);

    // FIXME: this is just a hack, please make it work properly  
    // something wrong happens with the usePhanLoaiHocTrenTruongContext, 
    // all the variable gets from it are undefined 
    console.log("FIXME: this is just a hack, to get the tkb rendered");
    
    const rowDataHocTrenTruong = html2RowDataHocTrenTruong(dataExcel.data);

    //const location = useLocation()
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
