import { post } from '../common';
import { isEmptyOrWhitespace } from '../helper';
import Cookies from 'js-cookie';

const login = async (data) => {
    if(isEmptyOrWhitespace(data.email) || isEmptyOrWhitespace(data.password)){
        throw new Error("Error: Please fill all the fields");
    }
    try{
        const response = await post("/api/auth/login", data);

        localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, name: response.data.data.name, email: response.data.data.email }));

        return response.data;
    } catch (error){
        throw new Error(error);
    }
}


const signup = async (data) => {
    if(isEmptyOrWhitespace(data.fullName) || isEmptyOrWhitespace(data.email) || isEmptyOrWhitespace(data.password)){
        throw new Error("Error: Please fill all the fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)){
        throw new Error("Error: Invalid email address");
    }

    try{
        const response = await post("/api/auth/signup", data);

        localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, name: response.data.data.name, email: response.data.data.email }));
        
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

const forgotPassword = async (data) => {
    if(isEmptyOrWhitespace(data.email)){
        throw new Error("Error: Please fill all the fields");
    }

    try{
        const response = await post("/api/auth/forgot-password", data);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

const resetPassword = async(token, data) => {
    if(isEmptyOrWhitespace(data.password)){
        throw new Error("Error: Please fill all the fields");
    }

    try{
        const response = await post(`/api/auth/reset-password/${token}`, data);
        return response.data;
    } catch (error){
        throw new Error(error);
    }
}

const logout = () => {
    // Clear auth data in localStorage
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn: false, name: '', email: '' }));

    // Remove auth-token cookie
    Cookies.remove('auth-token');

    // Redirect
    window.location.href = '/dashboard'; 
}

export {login, signup, forgotPassword, resetPassword, logout}