import { createContext, useContext, useState } from "react"
import { Outlet } from 'react-router-dom';
import { RenderHeader } from "../components/structure/Header";
import { RenderMenu, RenderRoutes } from "../components/structure/RenderNavigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState({name: "", isAuthenticated: false})

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const resultUser = result.user;
            //setUser({displayName: result.user.displayName, email: result.user.email});

            console.log("user", resultUser);
            console.log("user", resultUser.email);

            console.log("Firebase login");
            if (resultUser.accessToken) {
                setUser({name: resultUser.displayName, isAuthenticated: true})
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
        setUser({...user, isAuthenticated: false})
    }


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {console.log(children)}
            {children}
        </AuthContext.Provider>

    )

}
