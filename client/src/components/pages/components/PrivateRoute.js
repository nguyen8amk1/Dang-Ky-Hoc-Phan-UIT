import { AuthData } from '../../../auth/AuthProvider';
import Login from './Login'; 

import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';
 
export function PrivateRoute({ children }) {
    //const {userIsLoggedIn, checkIfSessionValid} = AuthData();
    const {userIsAuthenticated} = AuthData();

    useEffect(() => {
        //checkIfSessionValid();
    }, []);

    //return userIsAuthenticated() ? <>{children}</> : <Navigate to="" />;
    console.log("This is the current children: ", children);
    return userIsAuthenticated() ? <>{children}</> : <Login />;
}
