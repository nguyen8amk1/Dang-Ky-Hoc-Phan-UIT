import Header from './components/HomePageHeader.js'; 
import Footer from './components/Footer.js'; 
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import { NavLink, Link} from 'react-router-dom';

const lastestProduct = {
    name: "Google Calendar Generator", 
    description: "Tạo Google Calendar từ TKB UIT",
}

export const Home = () => {
    return (
        // NOTE: banner 
        <>
            <Header/>
            <Grid container 
                sx={{
                    margin:'2em 2em 0 0', 
                    height: "25em", // NOTE: just for now  
                }}>

                <Grid container sm={6} md={6} lg={6} 
                    item={true}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                    }}>

                    <Grid item> 
                        <Typography color="white" sx={{
                            fontSize: "2em", 
                            backgroundColor:"blue"
                        }}>
                            {lastestProduct.name}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography color="white" sx={{
                            backgroundColor:"blue"
                        }}>
                            {lastestProduct.description}
                        </Typography>
                    </Grid>

                    <Grid item> 
                        <NavLink to="gcg/step1-html-upload">
                            <Button variant="contained">
                                Thử ngay 
                            </Button>
                        </NavLink>
                    </Grid>
                </Grid>

                <Grid container sm={6} md={6} lg={6} 
                    item={true}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        backgroundImage: 'url("https://i.ibb.co/yN2fj5R/Buff-Doge-vs.png")',
                        backgroundRepeat: 'no-repeat', 
                    }}>
                </Grid> 


            </Grid>

            <Grid container
                item={true}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    margin: "2em 0 2em 0"
                }}
            >

            <Typography color="primary" align="center" 
                sx={{
                    fontSize: "2em", 
                }}>
                Sản phẩm của chúng tôi
            </Typography>

            <Grid container 
                item={true}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item sx={{
                    width: "18em", 
                }}> 
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        src="https://i.ibb.co/RH7KVjF/Buff-Doge.png"/>
                </Grid>

                {/* <Grid item sx={{ */}
                {/*     width: "18em",  */}
                {/* }}>  */}
                {/*     <img style={{ width: "100%", height: "100%", objectFit: "cover" }} */}
                {/*         src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg"/> */}
                {/* </Grid> */}

            </Grid>

            </Grid>
            <Footer/>
        </>
    )

}
