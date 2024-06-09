// AuthContext.js

import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { loginUser,registerUser, validateTokenAuth } from '../api/auth';




const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const { token } = action.payload || {};

    return {
      ...state,
      ...(token
        ? {
            isAuthenticated: true,
            isLoading: false,
            token,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      token,
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    const { token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      token,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      token: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = useCallback(async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem('authenticated') === 'true';
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const isValid = await validateToken(token);
        if (!isValid) {
          isAuthenticated = false;
          localStorage.clear();
        } else {
          dispatch({
            type: HANDLERS.INITIALIZE,
            payload: { token },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }

    if (!isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  }, [dispatch]);

  const validateToken = async (token) => {
    try {
      const encodedToken = encodeURIComponent(token);
      const response = await validateTokenAuth(encodedToken);

      if (response.status === 200) {
        return true;
      } else {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
  };

  useEffect(() => {
    initialize();
  }, [initialize]);

  const signIn = async (email, password) => {
    try {
      // Replace the following line with the correct path to your `loginUser` function
      const response = await loginUser({ email, password });
      const { token } = response.data;
  
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('token', token);
  
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: { token },
      });

     
    } catch (error) {
      if(error.response.status===406){
        throw new Error(`${error.response.data.message}`);
      }
      throw new Error('Login failed. Please check your credentials.');
    }
  };
  

  // Dummy sign-up function for testing
  const signUp = async (name, email, password) => {
    try {
      const user = { name, email };
      const { token } = await registerUser({ name, email, password });

      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('token', token);

      dispatch({
        type: HANDLERS.SIGN_UP,
        payload: { user, token },
      });
    } catch (error) {
      if(error.response.status===406){
        throw new Error(`${error.response.data.message}`);
      }
      throw new Error('Sign-up failed. Please try again.');
    }
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
