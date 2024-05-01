import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthData } from "../../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function SignInWithGoogleButton() {
    const navigate = useNavigate();
    const { user, login, logout } = AuthData();
    console.log("from render menu: ", user);

    const doLogin = async () => {
        try {
            await login();
            console.log("authenticated user: ", user);
            navigate("/");
        } catch (error) {
            // setErrorMessage(error)
            console.log(error);
        }
    }

    return(
        <>
            <Button onClick={doLogin} variant="contained" endIcon={<GoogleIcon />}>
            Sign In With Google
            </Button>
        </>
    );
}

export default SignInWithGoogleButton; 
