import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import { RenderHeader } from "./components/structure/Header";
import { RenderMenu, RenderRoutes } from "./components/structure/RenderNavigation";

import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <GoogleOAuthProvider clientId="39117228837-iktth2scgqkeojkeg5tbemcu2o9ab9fq.apps.googleusercontent.com">
                    <AuthProvider>
                        {/* <RenderHeader /> */}
                        <RenderMenu />
                        <RenderRoutes />

                    </AuthProvider>
                </GoogleOAuthProvider>;
            </BrowserRouter>
        </div>
    );
}

export default App;
