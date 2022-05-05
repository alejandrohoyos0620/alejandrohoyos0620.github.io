import React from "react";
import { post, get, QueryGet, QueryPost, QueryPut } from "../../infrastructure/http/http";

export const VerifyDocument = async (document) => {
    try {
        const response = await get('/email/verify', document);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const Login = async (user) => {
    try {
        const response = await post('/auth/login', user);
        if (response.err === null && response.data.success)
            setUser(response.data.data);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const ForgotPassword = async (email) => {
    try {
        const response = await post('/password/forgot-password', email);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const RecoveryPassword = async (recovery_data) => {
    try {
        const response = await post('/password/reset', recovery_data);
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

//real
export const FetchAll = async () => {
    try {
        const response = await QueryGet('/users');
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const FetchUserLogged = async () => {
    try {
        const response = await QueryGet('/user');
        return response
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const Register = async (user) => {
    try {
        const response = await QueryPost('/auth/register', user);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const FetchRoles = async () => {
    try {
        const response = await QueryGet('/roles/get-admin-roles');
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const setUser = (user) => {
    console.log(user);
    if(user) localStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const Logout = () => {
    localStorage.removeItem('user');
}

export const UpdateUser = async (user, id) => {
    const url = `/clients/${id}`;
    try {
        const response = await QueryPut(url, user);
        return response;
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
    FetchAll,
    FetchRoles,
    getUser,
    setUser,
    Logout,
    UpdateUser,
    FetchUserLogged
};