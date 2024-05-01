import Header from './WebAppHeader';
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useGoogleCalendarGeneratorContext} from '../GoogleCalendarGenerator';

function GeneratedCalendar() {
    const navigate = useNavigate();
    const {clearCalendarSession} = useGoogleCalendarGeneratorContext();
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
                    }} onClick={() => {clearCalendarSession(); navigate('/gcg/step-1-html-upload')}} >Upload TKB khác</Button>
                </Grid>
                <Grid item>
                    <Button size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }}>Tạo Google Calendar</Button>
                </Grid>
            </Grid>
            This is the GeneratedCalendar
        </>
    );
}

export default GeneratedCalendar;
