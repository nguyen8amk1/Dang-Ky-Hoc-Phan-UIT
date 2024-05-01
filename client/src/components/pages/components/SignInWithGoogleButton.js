import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthData } from "../../../auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";


function SignInWithGoogleButton() {
    const navigate = useNavigate();
    const { user, login, logout } = AuthData();
    console.log("from render menu: ", user);

    return(
        <>
            <Button onClick={login} variant="contained" endIcon={<GoogleIcon />}>
            Sign In With Google
            </Button>
        </>
    );
}

export default SignInWithGoogleButton; 
