import SubmitYourHocPhanInfo from '../components/SubmitYourHocPhanInfo';
import GeneratedLichThi from '../components/GeneratedLichThi';
import {useState, useEffect} from 'react';

export function LichThi_GoogleCalendarGenerator() {
    const [goodSubmittedInfoEvent, setGoodSubmittedInfoEvent] = useState(false);
    const [wantToUploadAnotherTTDKHPEvent, setWantToUploadAnotherTTDKHPEvent] = useState(false);    
    const [currentState, setCurrentState] = useState("CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE");

    useEffect(() => {
        console.log("Re-render")
        switch(currentState) {
            case "CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE": {
                const lichThiHaveBeenGenerated = localStorage.getItem("raw-lichthi-schedule") !== null; 
                if(lichThiHaveBeenGenerated == true) {
                    setCurrentState("SHOW_CALENDAR_PREVIEW");
                } else {
                    setCurrentState("SUBMIT_TTDKHP");
                }

                break;
            }
            case "SUBMIT_TTDKHP": {
                if(goodSubmittedInfoEvent) {
                    setGoodSubmittedInfoEvent(false); // Reset the event  

                    setCurrentState("SHOW_CALENDAR_PREVIEW");
                } else {
                    setCurrentState("SUBMIT_TTDKHP");
                }

                break;
            } 
            case 'SHOW_CALENDAR_PREVIEW': {
                if(wantToUploadAnotherTTDKHPEvent) {
                    setWantToUploadAnotherTTDKHPEvent(false); // Reset the event 



                    setCurrentState("SUBMIT_TTDKHP");
                }
            }
        }
    }, [wantToUploadAnotherTTDKHPEvent, goodSubmittedInfoEvent]);

    return (
        <>
            {(  currentState==="SUBMIT_TTDKHP") && 
                <SubmitYourHocPhanInfo setGoodSubmittedInfoEvent={setGoodSubmittedInfoEvent}/>
            }

            {(  currentState==="SHOW_CALENDAR_PREVIEW") && 
                <GeneratedLichThi setWantToUploadAnotherTTDKHPEvent={setWantToUploadAnotherTTDKHPEvent}/>
            } 
        </>
    );
}
