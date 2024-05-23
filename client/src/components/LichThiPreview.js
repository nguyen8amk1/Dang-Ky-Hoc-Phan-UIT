import Header from './WebAppHeader';
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useGoogleCalendarGeneratorContext} from '../pages/LichHoc_GoogleCalendarGenerator';
import {generateGoogleCalendar} from '../pages/Result';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import ThoiKhoaBieuTable from "./ThoiKhoaBieuTable";
import Login from './Login'; 
import { AuthData } from '../auth/AuthProvider';

const States = {
    WANT_TO_GENERATE_GOOGLE_CALENDAR: 0, 
    GENERATING_GOOGLE_CALENDAR: 1, 
    GENERATE_GOOGLE_CALENDAR_FAIL: 2, 
    GENERATE_GOOGLE_CALENDAR_SUCCESS: 3,
    DEMAND_USER_TO_LOGIN: 4, 
}; 

function LichThiPreview({setWantToUploadAnotherTTDKHPEvent}) {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState(States.WANT_TO_GENERATE_GOOGLE_CALENDAR);
    const {userIsAuthenticated} = AuthData();
    //const {clearCalendarSession} = useGoogleCalendarGeneratorContext();
    const [event__suddenlyDontWantToLoginAnymore, setEvent__suddenlyDontWantToLoginAnymore] = useState(false); 

    useEffect(() => {
        switch(currentState) {
            case States.WANT_TO_GENERATE_GOOGLE_CALENDAR: {
                break; 
            }
            case States.GENERATING_GOOGLE_CALENDAR: {
                async function generateCalendar() {
                    const generateCalendarSuccess = await generateGoogleCalendar();
                    if(generateCalendarSuccess) {
                        setCurrentState(States.GENERATE_GOOGLE_CALENDAR_SUCCESS);
                    } else {
                        setCurrentState(States.GENERATE_GOOGLE_CALENDAR_FAIL);
                    }
                }

                generateCalendar();
                break; 
            }
            case States.GENERATE_GOOGLE_CALENDAR_SUCCESS: {
                // TODO: 
                break; 
            }
            case States.GENERATE_GOOGLE_CALENDAR_FAIL: {
                // TODO: 
                break; 
            }
            case States.DEMAND_USER_TO_LOGIN: {
                console.log("user is : " + userIsAuthenticated());
                if(userIsAuthenticated()) {
                    console.log("THIS USER IS SUPPOSE TO BE LOGGED IN ALREADY");
                    setCurrentState(States.GENERATING_GOOGLE_CALENDAR);
                } else if(event__suddenlyDontWantToLoginAnymore){
                    setEvent__suddenlyDontWantToLoginAnymore(false); // Reset Event
                    setCurrentState(States.WANT_TO_GENERATE_GOOGLE_CALENDAR);
                }
                break; 
            }
        }

    }, [currentState, event__suddenlyDontWantToLoginAnymore, userIsAuthenticated]); 



    const handleGenerateGoogleCalendar = async () => {
        if(userIsAuthenticated()) {
            setCurrentState(States.GENERATING_GOOGLE_CALENDAR);
        } else {
            setCurrentState(States.DEMAND_USER_TO_LOGIN);
        }
    }

    const handleUploadAnotherTKB = () => {
        //clearCalendarSession(); 
        //navigate('/gcg/step-1-html-upload');
    }


    return(
        // TODO: what i'm gonna need 
        // 1. 2 Buttons 
        // 2. A calendar view 
        <>
            {currentState === States.DEMAND_USER_TO_LOGIN 
                ? <Login setEvent__suddenlyDontWantToLoginAnymore={setEvent__suddenlyDontWantToLoginAnymore}/>
                : <>
            <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    margin: '3em'
                }}
            >
                <Grid item>
                    {/* TODO: when clicked remove the generatedCalendar and submittedfile and navigate to the gcg/step1-html-upload*/}
                    <Button size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }} onClick={() => {setWantToUploadAnotherTTDKHPEvent(true)}} >Upload TKB khác</Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }} onClick={handleGenerateGoogleCalendar}>Tạo Google Calendar</Button>
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={currentState === States.GENERATING_GOOGLE_CALENDAR}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog onClose={() => {setCurrentState(States.WANT_TO_GENERATE_GOOGLE_CALENDAR)}} open={currentState === States.GENERATE_GOOGLE_CALENDAR_FAIL || currentState === States.GENERATE_GOOGLE_CALENDAR_SUCCESS}>
                { currentState === States.GENERATE_GOOGLE_CALENDAR_SUCCESS && <DialogTitle>The operation is SUCCESS</DialogTitle> }
                { currentState === States.GENERATE_GOOGLE_CALENDAR_FAIL && <DialogTitle>The operation is FAIL</DialogTitle> }
            </Dialog>

            <ThoiKhoaBieuTable />

                </>} 
        </>
    );
}

export default LichThiPreview;
