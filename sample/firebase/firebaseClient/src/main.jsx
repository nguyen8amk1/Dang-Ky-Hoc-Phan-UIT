import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import router from './router';
import './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
  //   <RouterProvider router={router} />
  // </Container>
    //
    
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


