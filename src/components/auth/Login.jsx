import React, { useState } from 'react';
import { loginUser } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const[errorMessage, setErrorMessage] = useState("");
    const[login, setLogin] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value});
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await loginUser(login);
        if (success) {
            const token = success.token;
            const decodedToken = jwtDecode(token);
            localStorage.setItem("token",token);
            localStorage.setItem("userId",decodedToken.sub);
            localStorage.setItem("userRole",decodedToken.roles.join(","));
            navigate("/");
            window.location.reload();
        }else{
            setErrorMessage("Invalid username or password. Please try again.");
        }
        setTimeout(() => {
            setErrorMessage("");
        }, 4000);
    }

    return (
        <div>
            
        </div>
    );
}

export default Login;
