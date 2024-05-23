import Header from './WebAppHeader';
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useGoogleCalendarGeneratorContext} from '../pages/LichHoc_GoogleCalendarGenerator';
import Result from '../pages/Result';
import {generateGoogleCalendar} from '../pages/Result';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

function LichThiPreview({setWantToUploadAnotherTTDKHPEvent}) {
    //const navigate = useNavigate();
    //const {clearCalendarSession} = useGoogleCalendarGeneratorContext();
    const [calendarState, setCalendarState] = useState("haven't");

    // TODO: how to do enum is JS ?? 
    // 4 states: 
    // haven't
    // isDoing 
    // success 
    // fail 
    

    const handleGenerateGoogleCalendar = async () => {
        setCalendarState("isDoing"); 
        const result = await generateGoogleCalendar(); 
        if(result)
            setCalendarState("success");
        else 
            setCalendarState("fail");
    }

    const handleUploadAnotherTKB = () => {
        //clearCalendarSession(); 
        //navigate('/gcg/step-1-html-upload');
    }

    const getCalendarStateStatus = () => {
        if(calendarState === 'success') {
            return "Success"; 
        }
        else if(calendarState === 'fail') {
            return "Failed"; 
        }
    }

    return(
        // TODO: what i'm gonna need 
        // 1. 2 Buttons 
        // 2. A calendar view 
        <>
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
                open={calendarState === 'isDoing'}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog onClose={() => {setCalendarState("haven't")}} open={calendarState === 'success' || calendarState === 'fail'}>
                <DialogTitle>The operation is {getCalendarStateStatus()}</DialogTitle>
            </Dialog>
            <Result/>
        </>
    );
}

export default LichThiPreview;
