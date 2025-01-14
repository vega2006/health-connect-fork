import React from 'react'
import { createContext } from 'react';
export const AppContext=createContext();

    const AppContextProvider = (props) => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const value={
        backendUrl,
    }
  return (
    <div>
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    </div>
 

)
}

export default AppContextProvider