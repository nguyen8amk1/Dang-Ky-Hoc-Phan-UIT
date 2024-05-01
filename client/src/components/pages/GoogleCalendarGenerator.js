import Login from './components/Login'; 
import {useState, useEffect, createContext, useContext} from 'react'; 
import SubmitYourTkbHTML from './components/SubmitYourTkbHTML'
import GeneratedCalendar from './components/GeneratedCalendar'
import { CircularProgress } from '@mui/material';
import Header from './components/WebAppHeader'; 
import { AuthData } from "../../auth/AuthProvider";
import { Navigate, Outlet } from 'react-router-dom';

const GoogleCalendarGeneratorContext = createContext();
export const useGoogleCalendarGeneratorContext = () => useContext(GoogleCalendarGeneratorContext);

export const GoogleCalendarGeneratorProvider = ({children}) => {
    console.log("Google Calendar generation provider ");
    // const [submittedFile, setSubmittedFile] = useState(undefined);
    // const [generatedCalendar, setGeneratedCalendar] = useState(undefined);
    
    const clearCalendarSession = () => {
        localStorage.removeItem("generatedCalendar");
        localStorage.removeItem("submittedFile");
    }

    const setGeneratedCalendar = (generatedCalendar) => {
        localStorage.setItem("generatedCalendar", generatedCalendar);
    }


    const setSubmittedFile = (file) => {
        localStorage.setItem("submittedFile", file);
    }

    const handleFileSubmit = (file) => {
        // TODO: Handle file submission, for now, we just set the submittedFile state
        console.log("phai: ", file);
        setSubmittedFile(file);
        console.log("submittedFile: ", submittedFile());

        // For demonstration purposes, let's assume the calendar generation happens asynchronously
        // Simulate the behavior of generating calendar after 2 seconds
        if(file) {
            const generatedCalendarData = {}; // Assume you have generated calendar data
            setGeneratedCalendar(generatedCalendarData);
        }
        console.log("handle file submit: ", submittedFile(), generatedCalendar()); 
        // setTimeout(() => {
        //     const generatedCalendarData = {}; // Assume you have generated calendar data
        //     setGeneratedCalendar(generatedCalendarData);
        // }, 2000);
    };

    const submittedFile = () => {
        return localStorage.getItem("submittedFile");
    }

    const generatedCalendar = () => {
        return localStorage.getItem("generatedCalendar");
    }

    return (
    <GoogleCalendarGeneratorContext.Provider
            value={{submittedFile, generatedCalendar, handleFileSubmit, clearCalendarSession}}
        >
            {children}
    </GoogleCalendarGeneratorContext.Provider>
    );
}

function GoogleCalendarGenerator({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    // TODO: Moves these states to global using Context API
    // The handleFileSubmit function 
    // the generated data 
    // the submitedData 
    // const [submittedFile, setSubmittedFile] = useState(undefined);
    // const [generatedCalendar, setGeneratedCalendar] = useState(undefined);
    const { userIsAuthenticated, user } = AuthData();
    const {submittedFile, generatedCalendar, handleFileSubmit} = useGoogleCalendarGeneratorContext();

    useEffect(() => {
        // TODO: check for login
        // conditional rendering the login dialog 
        // TODO: set loading for when checking the logged in
        const loggedIn = userIsAuthenticated() !== undefined;
        console.log(loggedIn, userIsAuthenticated());
        setLoggedIn(loggedIn);
    }, [user]);  
    
    return(
        <>
            <Header/>
            {loggedIn === undefined && <CircularProgress/>}
            {loggedIn !== undefined && <Login loggedIn={loggedIn}/>}

            {/**/}
            {/* TODO: instead of showing the file submit form -> navigate to the submit */}
            {/* {loggedIn && !submittedFile && <SubmitYourTkbHTML onSubmit={handleFileSubmit} />} */}
            {/* // TODO:  instead of showing the generated calendar -> navigate to the thing*/}
            {/* {generatedCalendar && <GeneratedCalendar data={generatedCalendar} />} */}

            {loggedIn && !submittedFile() && <Navigate to='/gcg/step1-html-upload'/> }
            {generatedCalendar() && <Navigate to='/gcg/step2-generate-calendar'/>}

            {/* Show loading state or spinner while calendar is being generated */}
            {!generatedCalendar() && submittedFile() && <CircularProgress/>}

            <Outlet/>
        </>
    ); 
} 

export default GoogleCalendarGenerator;
