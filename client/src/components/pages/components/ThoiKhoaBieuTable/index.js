import FileDownloadIcon from "@mui/icons-material/FileDownload"
import { IconButton, Tooltip } from "@mui/material"
import clsx from "clsx"
import { useLocation } from "react-router-dom"
import ImageIcon from "@mui/icons-material/Image"
import { useState } from "react"

//import { ROUTES } from "../../../constants"
//import { getDanhSachTiet } from "../../../utils"
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
    if (data === CELL.NO_CLASS) return <td />
    if (data === CELL.OCCUPIED) return null
    //return <ClassCell data={data} rowSpan={getDanhSachTiet(data.Tiet).length} />
    return <ClassCell data={data} rowSpan={102} />
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

function Render() {
    const {
        //rowDataHocTrenTruong,
        khongHocTrenTruong,
        redundant
    } = usePhanLoaiHocTrenTruongContext()

    // FIXME: this is just a hack, please make it work properly  
    // something wrong happens with the usePhanLoaiHocTrenTruongContext, 
    // all the variable gets from it are undefined 
    
    console.log("FIXME: this is just a hack, to get the tkb rendered");

    const rowDataHocTrenTruong = []; 
    // for (let i = 0; i < 13; i++) {
    //     rowDataHocTrenTruong.push({
    //         Thu2: CELL.NO_CLASS,
    //         Thu3: CELL.NO_CLASS,
    //         Thu4: CELL.NO_CLASS,
    //         Thu5: CELL.NO_CLASS,
    //         Thu6: CELL.NO_CLASS,
    //         Thu7: CELL.NO_CLASS,
    //         CN: CELL.NO_CLASS,
    //     })
    // }
    
    rowDataHocTrenTruong.push({ Thu2: CELL.NO_CLASS, Thu3: CELL.NO_CLASS, Thu4: CELL.NO_CLASS, Thu5: CELL.NO_CLASS, Thu6: CELL.NO_CLASS, Thu7: CELL.NO_CLASS, CN: CELL.NO_CLASS, });
    rowDataHocTrenTruong.push({ Thu2: CELL.OCCUPIED, Thu3: CELL.OCCUPIED, Thu4: CELL.NO_CLASS, Thu5: CELL.NO_CLASS, Thu6: CELL.NO_CLASS, Thu7: CELL.NO_CLASS, CN: CELL.NO_CLASS, });
    rowDataHocTrenTruong.push({ Thu2: CELL.NO_CLASS, Thu3: CELL.OCCUPIED, Thu4: CELL.NO_CLASS, Thu5: CELL.NO_CLASS, Thu6: CELL.NO_CLASS, Thu7: CELL.NO_CLASS, CN: CELL.NO_CLASS, });
    rowDataHocTrenTruong.push({ Thu2: CELL.NO_CLASS, Thu3: CELL.NO_CLASS, Thu4: CELL.NO_CLASS, Thu5: CELL.NO_CLASS, Thu6: CELL.NO_CLASS, Thu7: CELL.NO_CLASS, CN: CELL.NO_CLASS, });
    rowDataHocTrenTruong.push({ Thu2: CELL.NO_CLASS, Thu3: CELL.NO_CLASS, Thu4: CELL.NO_CLASS, Thu5: CELL.NO_CLASS, Thu6: CELL.NO_CLASS, Thu7: CELL.NO_CLASS, CN: CELL.NO_CLASS, });

    // const rowDataHocTrenTruong = [
    //     { Thu2: {  }, Thu3: {  }, Thu4: {  }, Thu5: null, Thu6: null, Thu7: null }, // tiet 1
    //     { Thu2: 'xx', Thu3: 'xx', Thu4: 'xx', Thu5: null, Thu6: {  }, Thu7: null }, // tiet 2
    //     { Thu2: 'xx', Thu3: 'xx', Thu4: 'xx', Thu5: null, Thu6: 'xx', Thu7: null }, // tiet 3
    //     { Thu2: {  }, Thu3: 'xx', Thu4: 'xx', Thu5: null, Thu6: 'xx', Thu7: null }, // tiet 4
    //     { Thu2: 'xx', Thu3: 'xx', Thu4: null, Thu5: null, Thu6: 'xx', Thu7: null }, // tiet 5
    //     { Thu2: {  }, Thu3: null, Thu4: {  }, Thu5: {  }, Thu6: null, Thu7: null }, // tiet 6
    //     { Thu2: 'xx', Thu3: null, Thu4: 'xx', Thu5: 'xx', Thu6: null, Thu7: null }, // tiet 7
    //     { Thu2: 'xx', Thu3: null, Thu4: 'xx', Thu5: 'xx', Thu6: null, Thu7: null }, // tiet 8
    //     { Thu2: 'xx', Thu3: null, Thu4: 'xx', Thu5: null, Thu6: null, Thu7: null }, // tiet 9
    //     { Thu2: 'xx', Thu3: null, Thu4: 'xx', Thu5: null, Thu6: null, Thu7: null }, // tiet 10
    // ];
    
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
