import {Box, Container, Typography, Grid, Button} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';

function SubmitYourTkbHTML({onSubmit}) {
    return(
        <>
            <Grid container 
                item={true}
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                border: "1px solid black", 
                padding: "1em", 
                width: "60%", 
                margin: 'auto',
                marginTop: '5%', 
            }}>
                <Grid item> 
                    <Typography color="black" sx={{
                        fontSize: "2em", 
                    }}>
                        Submit your TKB HTML
                    </Typography>
                </Grid>

                <Grid item>
                    <img alt="cat meme" style={{}}
                        src="https://lh5.googleusercontent.com/proxy/HwdGkmDL29exGcU98W9M0eHZgTW3gPDVE9f0geJQCXcU4r25HN9qYvGdgIT3VcT217v9qLfqyl9ToGuxMuR_XKhwlzyLmAoOx5oK7BxjfY0pgD_4DJaV09d2eDuBRHm2iG9MvrB8mwyjxApgaHv5QNSxPiR9"/>
                </Grid>

                <Grid item>
                </Grid>

                <Grid item> 
                    <DropzoneArea
                        acceptedFiles={['text/html']}
                        onDropRejected={(files) => {
                            alert('Only image files are allowed');
                        }}
                        dropzoneText={"Kéo thả file ở đây hoặc nhấn vào đây để chọn file trong thư mục"}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default SubmitYourTkbHTML;
