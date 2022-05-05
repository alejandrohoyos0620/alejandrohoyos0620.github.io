import React from "react";
// Toast Imports
import { toast } from 'react-toastify';

const toastConfigDefault = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const Success = (message, additionalConfig = null) => {
    if (!additionalConfig)
        toast.success(message, toastConfigDefault);
    else {
        const toastConfigNew = {
            ...toastConfigDefault,
            ...additionalConfig
        }
        toast.success(message, toastConfigNew);
    }
}

export const Error = (message, additionalConfig = null) => {
    if (!additionalConfig)
        toast.error(message, toastConfigDefault);
    else {
        const toastConfigNew = {
            ...toastConfigDefault,
            ...additionalConfig
        }
        toast.error(message, toastConfigNew);
    }
}

export const SetLoading = (message, additionalConfig = null) => {
    if (!additionalConfig)
        return toast.loading(message, toastConfigDefault);
    else {
        const toastConfigNew = {
            ...toastConfigDefault,
            ...additionalConfig
        }
        return toast.loading(message, toastConfigNew);
    }
}

export const Update = (message, id, error = null, success = null, additionalConfig = null) => {
    if (error) {
        const toastConfigDos = {
            isLoading: false,
            render: message,
            type: 'error',
        }
        const toastConfigNew = {
            ...toastConfigDefault,
            ...toastConfigDos
        };
        toast.update(id, toastConfigNew);

    } else if (success) {
        const toastConfigDos = {
            isLoading: false,
            render: message,
            type: 'success',
        }
        const toastConfigNew = {
            ...toastConfigDefault,
            ...toastConfigDos
        };
        toast.update(id, toastConfigNew);

    } else {
        const toastConfigNew = {
            ...toastConfigDefault,
            ...additionalConfig
        };
        toast.update(id, toastConfigNew);
    }
}



export default {
    Success,
    Error,
    SetLoading,
    Update
};