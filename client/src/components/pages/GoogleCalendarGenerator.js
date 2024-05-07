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


// TODO: this could be a great place for a state machine
//

// // The machine is the context, meaning it's gonna replace the GoogleCalendarGeneratorProvider
// import { createMachine } from "xstate";
// export const machine = createMachine(
//     {
//         id: "Small App Navigation",
//         initial: "Submit TKB HTML",
//         states: {
//             "Submit TKB HTML": {
//                 on: {
//                     "a tkb been submitted": {
//                         target: "Generate Calendar",
//                     },
//                 },
//             "Generate Calendar": {
//                 on: {
//                     "Submit another TKB": {
//                         target: "Submit TKB HTML",
//                     },
//                 },
//             },
//         },
//         on: {
//             "navigate to submit tkb": [
//                 {
//                     target: ".Submit TKB HTML",
//                     guard: "a file haven't been submitted",
//                 },
//                 {
//                     target: ".Generate Calendar",
//                 },
//             ],
//         },
//     },
//     {
//         actions: {},
//         actors: {},
//         guards: {
//             "a file haven't been submitted": ({ context, event }, params) => {
//                 return false;
//             },
//         },
//         delays: {},
//     },
// );


function GoogleCalendarGenerator({children}) {
    const { userIsAuthenticated } = AuthData();
    const {submittedFile, generatedCalendar, handleFileSubmit} = useGoogleCalendarGeneratorContext();
    
    return(
        <>
            <Header/>
            {userIsAuthenticated() && <CircularProgress/>}
            {/* {!userIsAuthenticated() !== undefined && <Login />} */}
            {/* {userIsAuthenticated() === undefined && <CircularProgress/>} */}

            {/* TODO: instead of showing the file submit form -> navigate to the submit */}
            {/* {userIsAuthenticated() && !submittedFile && <SubmitYourTkbHTML onSubmit={handleFileSubmit} />} */}
            {/* // TODO:  instead of showing the generated calendar -> navigate to the thing*/}
            {/* {generatedCalendar && <GeneratedCalendar data={generatedCalendar} />} */}

            {userIsAuthenticated() && !submittedFile() && <Navigate to='/gcg/step1-html-upload'/> }
            {generatedCalendar() && <Navigate to='/gcg/step2-generate-calendar'/>}

            {/* Show loading state or spinner while calendar is being generated */}
            {!generatedCalendar() && submittedFile() && <CircularProgress/>}

            <Outlet/>
        </>
    ); 
} 

export default GoogleCalendarGenerator;
