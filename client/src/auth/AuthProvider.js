import { createContext, useContext, useState, useEffect } from "react"
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { CircularProgress } from '@mui/material';

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    useEffect(()=> {
        const unsubscribeIdTokenChange = auth.onIdTokenChanged(user => {
            console.log("on state change: ", user); 
            // TODO: delegate all the user information setting in here instead in the login function
            // TODO: find a way to get new access token 
            //  -> onIdTokenChanged
            if(!user) {
                console.log("User sign out");
                setIsLoading(false);
                setUser({});
                localStorage.removeItem("accessToken");
                navigate('/');
                return; 
            } 

            console.log("User sign in Or token Change");
            setUser({name: user.displayName})
            if (user.accessToken !== localStorage.getItem('accessToken')) {
                console.log("Token change");
                localStorage.setItem('accessToken', user.accessToken);
                window.location.reload();
            }
            setIsLoading(false);
        });

        return () => {unsubscribeIdTokenChange(); } 
    }, [auth]); 

    const userIsAuthenticated = () => {
        //return localStorage.getItem("accessToken"); 
        return user?.name; 
    }

    const login = async () => {
        try {
            //const {displayName, photoURL, auth} = 
            await signInWithPopup(auth, provider);

            // const token = credential.accessToken;
            // const resultUser = result.user;
            // if (resultUser.accessToken) {
            //     setUser({name: resultUser.displayName})
            // } 
            
        } catch(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(error);
        }
    }

    const logout = async () => {
        try{
            await auth.signOut();
            navigate("/")
        } catch(e) {
            console.error(e);
        }
    }


    return (
        <AuthContext.Provider value={{user, userIsAuthenticated, login, logout}}>
            {isLoading ? <CircularProgress /> : children}
        </AuthContext.Provider>

    )

}
