import Header from './WebAppHeader';
import {Box, Container, Typography, Grid, Button} from '@mui/material';


function GeneratedCalendar() {
    return(
        // TODO: what i'm gonna need 
        // 1. 2 Buttons 
        // 2. A calendar view 
        
        <>
            <Header/>
            <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    margin: '3em'
                }}
            >
                <Grid item>
                    <Button size="large" variant="contained" sx={{
                        width: '13em',
                        height: '4em',
                    }}>Upload TKB khác</Button>
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
