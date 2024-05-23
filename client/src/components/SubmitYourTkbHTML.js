import {Box, Container, Typography, Grid, Button} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGoogleCalendarGeneratorContext} from '../pages/GoogleCalendarGenerator';
import { useTkbStore, selectDataExcel } from '../components/zus';
import {UIT_htmlFileProcessing} from '../pages/SelectExcel/file_format_processor'; 
import {AuthData} from '../auth/AuthProvider';
import Login from './Login';

function SubmitYourTkbHTML() {
    const [selectedFile, setSelectedFile] = useState(null);
    const {generatedCalendar, handleFileSubmit} = useGoogleCalendarGeneratorContext();
    const {userIsAuthenticated} = AuthData();

    const dataExcel = useTkbStore(selectDataExcel) || {};
    const setDataExcel = useTkbStore((s) => s.setDataExcel);
    const navigate = useNavigate();

    const handleFileChange = (files) => {
        console.log(files);
        setSelectedFile(files[0]);
    };

    const handleSubmit = () => {
        // Check if a file is selected
        if (selectedFile) {
            // Perform submission
            // Clear the selected file after submission
            
            // TODO: Figure out a way to get the file content out of this
            // TODO: submit mean: read the file content and move to the next step 
            // If the file content valid -> move to the next step 
            // If the file content not valid -> Tell user to find another file 

            const fileReader = new FileReader();
            fileReader.onload = () => {
                const fileContent = fileReader.result;
                const success = UIT_htmlFileProcessing({target: {result: fileContent}}, null, setDataExcel, selectedFile); 
                if(success) {
                    console.log("UIT HTML FILE PROCESS GOOD")
                } else {
                    console.log("UIT HTML FILE PROCESS BAD")
                }
                // Here you have access to the content of the file
                console.log("File content:", fileContent);
                //onSubmit(fileContent)
                handleFileSubmit(fileContent);
                // You can perform any validation or processing logic here
                console.log("Generated Calendar: ", generatedCalendar());

                if(generatedCalendar()) {
                    navigate('/gcg/step2-generate-calendar');
                }
            };
            setSelectedFile(null);
            fileReader.readAsText(selectedFile);

        } else {
            alert('Please select a file before submitting.');
        }
    };

    // if(!userIsAuthenticated()) {
    //     console.log("User is unauthenticated");
    //     return <Login/>
    // }

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
                        onChange={handleFileChange}
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default SubmitYourTkbHTML;
