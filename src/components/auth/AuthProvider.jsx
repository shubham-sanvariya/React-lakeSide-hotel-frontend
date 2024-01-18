import { jwtDecode } from 'jwt-decode';
import React, {  createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    user : null,
    handleLogin : (token) => {},
    handleLogout : () => {}
})

const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null);

    useEffect(() => {
        console.log(user)
    }, [user]);

    const handleLogin = (token) => {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId",decodedToken.sub);
        localStorage.setItem("userRole",decodedToken.roles);
        localStorage.setItem("token",token);
        setUser(decodedToken);
    }

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider 
        value={{user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
