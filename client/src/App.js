import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link, Outlet} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import {Home} from './components/pages/Home'; 

import { GoogleOAuthProvider } from '@react-oauth/google';

import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import GoogleCalendarGenerator from './components/pages/GoogleCalendarGenerator'; 
import { RenderMenu, RenderRoutes}from './components/structure/RenderNavigation'; 

import SubmitYourTkbHTML from './components/pages/components/SubmitYourTkbHTML'
import GeneratedCalendar from './components/pages/components/GeneratedCalendar'
import { GoogleCalendarGeneratorProvider, useGoogleCalendarGeneratorContext } from './components/pages/GoogleCalendarGenerator'




const theme = createTheme({
    // NOTE: any custom theme put here
}); 

function App() {
    // FIXME: do something with this mess, this is just a hack :v @Hacking
    const router = createBrowserRouter(
        createRoutesFromElements(
            // TODO: create a layout that wraps around these, to have a uniform layout
            <Route path='/'>
                <Route index element={
                    <GoogleOAuthProvider clientId="39117228837-iktth2scgqkeojkeg5tbemcu2o9ab9fq.apps.googleusercontent.com">
                        <AuthProvider>
                            <Home/>
                        </AuthProvider>
                    </GoogleOAuthProvider>
                }></Route>

                <Route path="gcg/*" element={ // Use wildcard to catch all nested routes under /gcg
                    <GoogleOAuthProvider clientId="39117228837-iktth2scgqkeojkeg5tbemcu2o9ab9fq.apps.googleusercontent.com">
                        <AuthProvider>
                            <GoogleCalendarGeneratorProvider>
                                <GoogleCalendarGenerator >
                                    <Outlet /> {/* Render nested routes */}
                                </GoogleCalendarGenerator >
                            </GoogleCalendarGeneratorProvider>
                        </AuthProvider>
                    </GoogleOAuthProvider>
                }>
                    <Route path="step1-html-upload" element={<SubmitYourTkbHTML />} />
                    <Route path="step2-generate-calendar" element={<GeneratedCalendar />} />
                </Route>            
            </Route>
        )
    )

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
