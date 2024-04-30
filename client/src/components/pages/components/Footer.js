import {Box, Container, Typography, Grid, Button, Stack} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';


function Footer() {
    return (
        <footer> 
            <Grid container
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    backgroundColor: "green", 
                    height: "12em", 
                }}
            >
                <Grid container sm={4} md={4} lg={4}
                    item={true}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid container
                        item={true}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Stack direction="row" spacing={2}>
                            <LocationOnIcon/>
                            <Typography color="primary" sx={{
                                fontSize: "1.3em"
                            }}>
                                Khu phố 6 P, Thủ Đức, TP.HCM
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <CallIcon/>
                            <Typography color="primary" sx={{
                                fontSize: "1.3em"
                            }}>
                                19001008
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <SendIcon/>
                            <Typography color="primary" sx={{
                                fontSize: "1.3em"
                            }}>
                                trungnguyen123akohshit@gmail.com
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Grid container sm={4} md={4} lg={4}
                    item={true}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid container
                        item={true}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography color="primary" sx={{
                            fontSize: "1.3em"
                        }}>
                            Một vài lời xamloz
                        </Typography>

                        <Typography paragraph="true" color="primary" sx={{
                            fontSize: "1.3em"
                        }}>
                            Lorem ipsum dolor sit amet, 
                            qui minim labore adipisicing minim sint 
                            cillum sint consectetur cupidatat.
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <FacebookIcon
                                color="primary"
                                sx={{
                                    fontSize: "3em"
                                }}
                            /> 
                            <GitHubIcon

                                sx={{
                                    fontSize: "3em"
                                }}
                            /> 
                        </Stack> 
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    ); 
}

export default Footer;
