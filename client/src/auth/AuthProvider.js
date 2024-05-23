import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

const loadStateFromLocalStorage = () => {
  const storedState = JSON.parse(localStorage.getItem('authState'));
  if (storedState) {
    return {
      ...storedState,
      status: 'tokenExpired'  // Trigger token refresh on load
    };
  } else {
    return {
      status: 'unauthenticated',
      accessToken: null,
      refreshToken: null,
      user: null,
      error: null,
    };
  }
};

const initialState = loadStateFromLocalStorage();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        status: 'authenticating',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'authenticated',
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        status: 'unauthenticated',
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        status: 'unauthenticated',
        accessToken: null,
        refreshToken: null,
        user: null,
        error: null,
      };
    case 'TOKEN_EXPIRED':
      return {
        ...state,
        status: 'tokenExpired',
      };
    case 'TOKEN_REFRESH_SUCCESS':
      return {
        ...state,
        status: 'authenticated',
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case 'TOKEN_REFRESH_FAILURE':
      return {
        ...state,
        status: 'unauthenticated',
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  const setTokenExpiryTimer = (expiresIn) => {
    setTimeout(() => {
      dispatch({ type: 'TOKEN_EXPIRED' });
    }, expiresIn * 1000);
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post('/refresh-token', { token: state.refreshToken });
      const { accessToken, refreshToken, expiresIn } = res.data;
      dispatch({
        type: 'TOKEN_REFRESH_SUCCESS',
        payload: { accessToken, refreshToken }
      });
      setTokenExpiryTimer(expiresIn);
    } catch (error) {
      dispatch({ type: 'TOKEN_REFRESH_FAILURE', payload: error });
    }
  };

  useEffect(() => {
    if (state.status === 'tokenExpired') {
      refreshToken();
    } else {
      setIsLoading(false);
    }
  }, [state.status]);

  useEffect(() => {
    if (state.status === 'authenticated' || state.status === 'unauthenticated') {
      localStorage.setItem('authState', JSON.stringify(state));
    }
  }, [state]);

  const login = useGoogleLogin({
    onSuccess: async response => {
      dispatch({ type: 'LOGIN' });
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        );
        const user = { name: res.data.name, image: res.data.picture };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            user
          }
        });
        setTokenExpiryTimer(response.expires_in);
      } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error });
      }
    }
  });

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const userIsAuthenticated = () => state.status === 'authenticated';
    console.log(state);

  return (
    <AuthContext.Provider value={{ user: state.user, userIsAuthenticated, login, logout }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

