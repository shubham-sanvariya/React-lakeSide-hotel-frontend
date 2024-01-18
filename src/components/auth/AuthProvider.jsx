import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    user : null,
    handleLogin : (token) => {},
    handleLogout : () => {}
})

const AuthProvider = () => {

    const[user, setUser] = useState(null);

    const handleLogin = (token) => {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId",decodedToken.sub);
        localStorage.setItem("userRole",decodedToken.roles);
        localStorage.setItem("token",token);
        setUser(decodedToken);
    }

    return (
        <div>
            
        </div>
    );
}

export default AuthProvider;
