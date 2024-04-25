import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import { RenderHeader } from "./components/structure/Header";
import { RenderMenu, RenderRoutes } from "./components/structure/RenderNavigation";

import './firebase/init_firebase'


function App() {
    return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>

            <RenderHeader />
            <RenderMenu />
            <RenderRoutes />

        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
