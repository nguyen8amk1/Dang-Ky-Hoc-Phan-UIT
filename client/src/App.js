import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import {Home} from './components/pages/Home'; 

import { GoogleOAuthProvider } from '@react-oauth/google';

import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import GoogleCalendarGenerator from './components/pages/GoogleCalendarGenerator.js'

const theme = createTheme({
    // NOTE: any custom theme put here
}); 

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <GoogleOAuthProvider clientId="39117228837-iktth2scgqkeojkeg5tbemcu2o9ab9fq.apps.googleusercontent.com">
                    <AuthProvider>
                        <ThemeProvider theme={theme}>
                            <Home/>
                            {/* <GoogleCalendarGenerator/> */}
                        </ThemeProvider>
                        {/* <RenderMenu /> */}
                        {/* <RenderRoutes /> */}
                    </AuthProvider>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
