import React, { createContext, useEffect, useState } from 'react';

export const TokenAuthContext = createContext();

function TokenAuthProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    return (
        <TokenAuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </TokenAuthContext.Provider>
    );
}

export default TokenAuthProvider;
