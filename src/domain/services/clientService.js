import React from "react";
import { post, get } from "../../infrastructure/http/http";

export const VerifyDocument = async (document) => {
    try {
        const response = await get('/auth/client/verify-existence', document);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const Login = async (client) => {
    try {
        const response = await post('/auth/client/login', client);
        if(response.err === null && response.data.success){
            setUser(response.data.data);
            // getUserData(response.data.data);
        }
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

const setUser = (user) => {
    console.log(user);
    if(user) localStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const Logout = () => {
    localStorage.removeItem('user');
}

export const Register = async (client) => {
    try {
        const response = await post('/auth/client/register', client);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const ForgotPassword = async (email) => {
    try {
        const response = await post('/password/clients/forgot-password', email);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const RecoveryPassword = async (recovery_data) => {
    try {
        const response = await post('/password/clients/reset', recovery_data);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default {
    Login,
    VerifyDocument,
    Register,
    ForgotPassword,
    RecoveryPassword,
    getUser,
    Logout
};