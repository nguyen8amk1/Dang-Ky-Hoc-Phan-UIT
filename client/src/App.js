import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import {Home} from './components/pages/Home'; 

import { GoogleOAuthProvider } from '@react-oauth/google';

import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import GoogleCalendarGenerator from './components/pages/GoogleCalendarGenerator'; 
import GeneratedCalendar from './components/pages/components/GeneratedCalendar'; 
import { RenderMenu, RenderRoutes}from './components/structure/RenderNavigation'; 


const router = createBrowserRouter(
    createRoutesFromElements(
        // TODO: create a layout that wraps around these, to have a uniform layout
        <Route path='/'>
            <Route index element={<Home/>}></Route>
            <Route path="gcg"   element={<GoogleCalendarGenerator/>}></Route>
        </Route>
    )
)

const theme = createTheme({
    // NOTE: any custom theme put here
}); 

function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}>
                <GoogleOAuthProvider clientId="39117228837-iktth2scgqkeojkeg5tbemcu2o9ab9fq.apps.googleusercontent.com">
                    <AuthProvider>
                        {/* <RenderMenu /> */}
                        {/* <RenderRoutes /> */}
                    </AuthProvider>
                </GoogleOAuthProvider>
            </RouterProvider>
        </ThemeProvider>
    );
}

export default App;
