import { AuthData } from '../auth/AuthProvider';
import Login from './Login'; 

import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';
 
// NOTE: haven't done yet, since i haven't think this through 
//
const States = {
    WANT_TO_DO_PRIVATE_ACTION: 0, 
    DOING_PRIVATE_ACTION: 1, 
    PRIVATE_ACTION_FAIL: 2, 
    PRIVATE_ACTION_SUCCESS: 3,
    DEMAND_USER_TO_LOGIN: 4, 
}; 

export function PrivateButton({ children }) {
    //const {userIsLoggedIn, checkIfSessionValid} = AuthData();
    const {userIsAuthenticated} = AuthData();
    const [currentState, setCurrentState] = useState(States.WANT_TO_DO_PRIVATE_ACTION);

    useEffect(() => {
        switch(currentState) {
            case States.WANT_TO_DO_PRIVATE_ACTION: {
                // TODO: 
                break; 
            }
            case States.DOING_PRIVATE_ACTION: {
                // TODO: 
                break; 
            }
            case States.PRIVATE_ACTION_SUCCESS: {
                // TODO: 
                break; 
            }
            case States.PRIVATE_ACTION_FAIL: {
                // TODO: 
                break; 
            }
        }
    }, []);

    //return userIsAuthenticated() ? <>{children}</> : <Navigate to="" />;
    console.log("This is the current children: ", children);
    //return userIsAuthenticated() ? <>{children}</> : <Login />;
    return <>{children}</>
}
