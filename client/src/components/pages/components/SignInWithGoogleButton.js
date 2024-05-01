import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function SignInWithGoogleButton() {
    return(
        <>
            {/* <Button variant="outlined" startIcon={<DeleteIcon />}> */}
            {/* Delete */}
            {/* </Button> */}
            <Button variant="contained" endIcon={<GoogleIcon />}>
            Sign In With Google
            </Button>
        </>
    );
}

export default SignInWithGoogleButton; 
