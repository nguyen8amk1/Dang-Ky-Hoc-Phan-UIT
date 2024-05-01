import Login from './components/Login'; 
import {useState, useEffect} from 'react'; 

function GoogleCalendarGenerator() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // TODO: check for login
        // conditional rendering the login dialog 
    }, []);  

    return(
        <>
            <Login loggedIn={loggedIn}/>
            GOOGLE CALENDAR GENERATOR
        </>
    ); 

} 

export default GoogleCalendarGenerator;
