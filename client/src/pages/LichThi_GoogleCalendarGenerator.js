import SubmitYourHocPhanInfo from '../components/SubmitYourHocPhanInfo';
import LichThiPreview from '../components/LichThiPreview';
import {useState, useEffect} from 'react';

const States = {
    CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE: 0, 
    SUBMIT_TTDKHP: 1,
    SHOW_CALENDAR_PREVIEW: 2, 
};

export function LichThi_GoogleCalendarGenerator() {
    const [goodSubmittedInfoEvent, setGoodSubmittedInfoEvent] = useState(false);
    const [wantToUploadAnotherTTDKHPEvent, setWantToUploadAnotherTTDKHPEvent] = useState(false);    
    const [currentState, setCurrentState] = useState(States.CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE);

    useEffect(() => {
        console.log("Re-render")
        switch(currentState) {
            case States.CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE: {
                const lichThiHaveBeenGenerated = localStorage.getItem("raw-lichthi-schedule") !== null; 
                if(lichThiHaveBeenGenerated == true) {
                    setCurrentState(States.SHOW_CALENDAR_PREVIEW);
                } else {
                    setCurrentState(States.SUBMIT_TTDKHP);
                }

                break;
            }
            case States.SUBMIT_TTDKHP: {
                if(goodSubmittedInfoEvent) {
                    setGoodSubmittedInfoEvent(false); // Reset the event  

                    setCurrentState(States.SHOW_CALENDAR_PREVIEW);
                } else {
                    setCurrentState(States.SUBMIT_TTDKHP);
                }

                break;
            } 
            case States.SHOW_CALENDAR_PREVIEW: {
                if(wantToUploadAnotherTTDKHPEvent) {
                    setWantToUploadAnotherTTDKHPEvent(false); // Reset the event 



                    setCurrentState(States.SUBMIT_TTDKHP);
                }
            }
        }
    }, [wantToUploadAnotherTTDKHPEvent, goodSubmittedInfoEvent]);

    return (
        <>
            {(  currentState===States.SUBMIT_TTDKHP) && 
                <SubmitYourHocPhanInfo setGoodSubmittedInfoEvent={setGoodSubmittedInfoEvent}/>
            }

            {(  currentState===States.SHOW_CALENDAR_PREVIEW) && 
                <LichThiPreview setWantToUploadAnotherTTDKHPEvent={setWantToUploadAnotherTTDKHPEvent}/>
            } 
        </>
    );
}
