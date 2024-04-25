import { createContext, useContext, useState } from "react"
import { Outlet } from 'react-router-dom';
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [ user, setUser ] = useState({name: ""})

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const userIsAuthenticated = () => {
        return localStorage.getItem("accessToken") !== null; 
    }

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const resultUser = result.user;

            console.log("user", resultUser);
            console.log("user", resultUser.email);

            console.log("Firebase login");
            if (resultUser.accessToken) {
                setUser({name: resultUser.displayName})

                localStorage.setItem("accessToken", resultUser.accessToken);
                return "success"
            } else {
                return "Incorrect password"
            }

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

    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/")
    }


    return (
        <AuthContext.Provider value={{user, userIsAuthenticated, login, logout}}>
            {console.log(children)}
            {children}
        </AuthContext.Provider>

    )

}
