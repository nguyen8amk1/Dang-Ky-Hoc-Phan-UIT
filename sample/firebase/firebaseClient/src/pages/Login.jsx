import React from 'react';
import {Button, Typography} from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Login() {
    const auth = getAuth();
    // const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName },
        } = await signInWithPopup(auth, provider);
    };

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/" />
    }
    return (
        <>
            <Typography>Login Page</Typography>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>Login with Google</Button>
        </>
    );
}
