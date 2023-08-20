// LightModeContext.js
import React, { createContext, useReducer } from 'react';
import LightModeReducer from './lightModeReducer';

const INITIAL_STATE = {
    lightMode: true, 
    
};

export const LightModeContext = createContext(INITIAL_STATE);

export const LightModeContextProvider = ({ children, initialLightMode }) => {
    const [state, dispatch] = useReducer(LightModeReducer, {
        ...INITIAL_STATE,
        lightMode: initialLightMode,
    });

    return (
        <LightModeContext.Provider value={{ lightMode: state.lightMode, dispatch }}>
            {children}
        </LightModeContext.Provider>
    );
};
