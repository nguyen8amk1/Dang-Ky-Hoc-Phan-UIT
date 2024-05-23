import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"

// import { tracker } from "../.."
// import SoTinChi from "../components/SoTinChi"
import ThoiKhoaBieuTable from "../../components/ThoiKhoaBieuTable"
//import { selectIsChiVeTkb, selectTongSoTcBuoc3, useTkbStore } from "../../zus"
import { useTkbStore } from '../../utils//zus';
// import ScriptDangKyInput, { DanhSachLopInput } from "./ScriptDangKyInput"
import CalendarCreator from './google_calendar'; 

export const generateGoogleCalendar = async () => {
    // TODO: return the result status 
    console.log("Generate Google Calendar");
    const accessToken = localStorage.getItem("accessToken");

    const calendarCreator = new CalendarCreator();
    calendarCreator.setAccessToken(accessToken);

    const calendarId = await calendarCreator.createCalendar("A NEW CALENDAR");
    console.log("New calendar id", calendarId);
    calendarCreator.setCalendarId(calendarId);
    
    const schedule = JSON.parse(localStorage.getItem('raw-format-schedule') || []); 
    console.log("schedule: ", schedule);
    calendarCreator.generateResultCalendar(schedule);

    return true;
}

export default function Index() {
    //generateGoogleCalendar();
    const setIsChiVeTkb = useTkbStore(s => s.setIsChiVeTkb); 
    // const khongXepLop = useTkbStore(selectIsChiVeTkb)
    // const tongSoTC = useTkbStore(selectTongSoTcBuoc3)

    const TABLE_EXTRA_BUTTONS_WIDTH = 30
    return (
        <div
            style={{
                marginTop: -10,
                maxWidth: 1500,
                paddingRight: TABLE_EXTRA_BUTTONS_WIDTH
            }}
        >
            {/* <button onClick={generateGoogleCalendar}>Generate Google Calendar</button> */}
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Tooltip
                    title={
                        window.location.search.includes("self_selected")
                            ? "Đang dùng tính năng chia sẻ TKB ?self_selected="
                            : "Tick chọn khi bạn không dùng chức năng Xếp Lớp ở Bước 2 và nhập danh sách lớp tự chuẩn bị"
                    }
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={khongXepLop}
                                onChange={e => {
                                    setIsChiVeTkb(e.target.checked)
                                    // tracker.track("[page3] checkbox_chi_ve_tkb_toggled", {
                                    //   newState: e.target.checked
                                    // })
                                }}
                                name="chiVeTkb"
                                color="primary"
                                size="small"
                            />
                        }
                        // style={!khongXepLop ? { opacity: 0.5 } : undefined}
                        label={"Tự chuẩn bị danh sách mã lớp"}
                    />
                </Tooltip>
                {/* <SoTinChi tongSoTcSelected={tongSoTC} /> */}
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: 10, marginTop: -10 }}>
                {/* <DanhSachLopInput /> */}
                {/* <ScriptDangKyInput /> */}
            </Grid>
            <ThoiKhoaBieuTable />
        </div>
    )
}
