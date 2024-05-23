import SubmitYourHocPhanInfo from '../components/SubmitYourHocPhanInfo';
import LichThiPreview from '../components/LichThiPreview';
import {useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';


const States = {
    CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE: 0, 
    SUBMIT_TTDKHP: 1,
    SHOW_CALENDAR_PREVIEW: 2, 
};

export function LichThi_GoogleCalendarGenerator() {
    // NOTE: infoEvent have 3 values: null, false, true
    const [goodSubmittedInfoEvent, setGoodSubmittedInfoEvent] = useState(null);
    const [wantToUploadAnotherTTDKHPEvent, setWantToUploadAnotherTTDKHPEvent] = useState(false);
    const [wantToSeePreviouslyCreatedCalendarEvent, setWantToSeePreviouslyCreatedCalendarEvent] = useState(false);
    const [currentState, setCurrentState] = useState(States.CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE);

    const [snackbarMessage, setSnackbarMessage] = useState(null);


    useEffect(() => {
        console.log("Re-render")
        switch(currentState) {
            case States.CHECK_IF_LICH_THI_HAVE_BEEN_GENERATED_BEFORE: {
                const lichThiHaveBeenGenerated = localStorage.getItem("raw-lichthi-schedule") !== null; 
                if(lichThiHaveBeenGenerated === true) {
                    setCurrentState(States.SHOW_CALENDAR_PREVIEW);
                } else {
                    setCurrentState(States.SUBMIT_TTDKHP);
                }

                break;
            }
            case States.SUBMIT_TTDKHP: {
                if(wantToSeePreviouslyCreatedCalendarEvent) {
                    setWantToSeePreviouslyCreatedCalendarEvent(false); // Reset the event  
                    setCurrentState(States.SHOW_CALENDAR_PREVIEW);
                } 
                if(goodSubmittedInfoEvent === true) {
                    setGoodSubmittedInfoEvent(null); // Reset the event  
                    setCurrentState(States.SHOW_CALENDAR_PREVIEW);
                } else if(goodSubmittedInfoEvent === false){
                    setGoodSubmittedInfoEvent(null); // Reset the event  

                    setSnackbarMessage("YOUR INFORMATION IS SHIT"); // Reset snackbar message after displaying it
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
    }, [currentState, snackbarMessage, wantToSeePreviouslyCreatedCalendarEvent, wantToUploadAnotherTTDKHPEvent, goodSubmittedInfoEvent]);


    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarMessage !== null}
                autoHideDuration={2000}
                onClose={() => {setSnackbarMessage(null)}}
                message={snackbarMessage}
            />

            {(  currentState===States.SUBMIT_TTDKHP) && 
                <SubmitYourHocPhanInfo lichThiHaveBeenGenerated={localStorage.getItem("raw-lichthi-schedule") !== null} setWantToSeePreviouslyCreatedCalendarEvent={setWantToSeePreviouslyCreatedCalendarEvent} setGoodSubmittedInfoEvent={setGoodSubmittedInfoEvent}/>
            }

            {(  currentState===States.SHOW_CALENDAR_PREVIEW) && 
                <LichThiPreview setWantToUploadAnotherTTDKHPEvent={setWantToUploadAnotherTTDKHPEvent}/>
            } 
    </>
    );
}
