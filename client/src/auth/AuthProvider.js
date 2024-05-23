import { createContext, useContext, useState, useEffect } from "react"
import { CircularProgress } from '@mui/material';

import { useNavigate, useLocation } from "react-router-dom";

import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [ user, setUser ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    
    const getUserInfo = async () => {
        // TODO: get the new access token, to compare with the old one 
        // FIXME: with this way of handling, everytime there are no internet connection -> auto logout  
        // -> since no internet also create exception
        const oldAccessToken = localStorage.getItem('accessToken'); 
        const newAccessToken = oldAccessToken;
        let userInfo; 
        try {
            const res = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo", 
                {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`
                    }
                }
            )
            userInfo = {displayName: res.data.name, picture: res.data.picture}; 
            console.log(res);
        } catch(e) {
            userInfo = undefined
            console.error(e);
        }
        return userInfo;
        //callback(userInfo);
    } 

    const checkIfSessionValid = async () => {
        // TODO: do something to check if the session is valid 

    }

    // useEffect( async ()=> {
    //     // NOTE: Setting the user information everytime the page load
    //     // TODO: 
    //     // 1. check if the access token is still valid -> calling the information url 
    //     // if user result valid -> setUser with the user information getted 
    //     // else -> setUser({})
    //
    //     const userInfo = await getUserInfo(); 
    //     console.log("on state change: ", userInfo); 
    //     // TODO: delegate all the userInfo information setting in here instead in the login function
    //     // TODO: find a way to get new access token 
    //     //  -> onIdTokenChanged
    //     if(!userInfo) {
    //         console.log("userInfo sign out");
    //         setIsLoading(false);
    //         logout();
    //         return; 
    //     } 
    //
    //     console.log("userInfo sign in Or token Change");
    //     setUser({name: userInfo.displayName, image: userInfo.picture}); 
    //     // if (userInfo.accessToken !== localStorage.getItem('accessToken')) {
    //     //     console.log("Token change");
    //     //     localStorage.setItem('accessToken', userInfo.accessToken);
    //     //     //window.location.reload();
    //     // }
    //     setIsLoading(false);
    //
    // }, []); 

    const userIsAuthenticated = () => {
        //return localStorage.getItem("accessToken"); 
        //return user?.name; 
        return false;
    }
    
    const login = useGoogleLogin({
        onSuccess: async response => {
            localStorage.setItem('accessToken', response.access_token);
            console.log(response.access_token);

            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo", 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    }
                )
                console.log(res.data);
                setUser({name: res.data.name, image: res.data.picture});
                console.log("authenticated user: ", user);
                console.log("location: ", location);
                //navigate('/');

            } catch(e) {
                setUser(undefined);
                console.error(e);
            }
        }
    });
    
    const logout = async () => {
        try{
            setUser({});
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            navigate('/');
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <AuthContext.Provider value={{user, userIsAuthenticated, login, logout}}>
        {/*     {isLoading ? <CircularProgress /> : children} */}
            {children}
        </AuthContext.Provider>
    )
}
