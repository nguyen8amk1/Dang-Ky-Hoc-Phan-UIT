import Login from './components/Login'; 
import {useState, useEffect} from 'react'; 
import SubmitYourTkbHTML from './components/SubmitYourTkbHTML'
import GeneratedCalendar from './components/GeneratedCalendar'
import { CircularProgress } from '@mui/material';

function GoogleCalendarGenerator() {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [submittedFile, setSubmittedFile] = useState(undefined);
    const [generatedCalendar, setGeneratedCalendar] = useState(undefined);

    useEffect(() => {
        // TODO: check for login
        // conditional rendering the login dialog 
        // TODO: set loading for when checking the logged in
        const loginCheckTimeout = setTimeout(() => {
            const isLoggedIn = true; // Assume the user is logged in for demonstration purposes
            setLoggedIn(isLoggedIn);
        }, 2000);

        // Clear the timeout on component unmount to avoid memory leaks
        return () => clearTimeout(loginCheckTimeout);
    }, []);  

    // TODO: what behaviour i want when i navigate to google calendar generator
    // 1. If haven't logged in -> Show login form
    // 2. If logged in -> Show submit file component/page 
    // 3. After submit file -> Show the calendar that generated from the submit file

    // Function to handle file submission
    const handleFileSubmit = (file) => {
        // TODO: Handle file submission, for now, we just set the submittedFile state
        setSubmittedFile(file);
        
        // For demonstration purposes, let's assume the calendar generation happens asynchronously
        // Simulate the behavior of generating calendar after 2 seconds
        setTimeout(() => {
            const generatedCalendarData = {}; // Assume you have generated calendar data
            setGeneratedCalendar(generatedCalendarData);
        }, 2000);
    };

    return(
        <>
            {loggedIn === undefined && <CircularProgress/>}
            {loggedIn !== undefined && <Login loggedIn={loggedIn}/>}

            {loggedIn && !submittedFile && <SubmitYourTkbHTML/>}
            {generatedCalendar && <GeneratedCalendar data={generatedCalendar} />}

            {/* Show loading state or spinner while calendar is being generated */}
            {!generatedCalendar && submittedFile && <CircularProgress/>}
        </>
    ); 
} 

export default GoogleCalendarGenerator;
