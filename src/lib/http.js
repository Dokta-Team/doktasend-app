import api, { DOKTA_ACCESS_TOKEN } from './axios';
import { toast } from "sonner";
const DOKTA_ACCESS_USER = process.env.NEXT_PUBLIC_DOKTA_ACCESS_USER;

export const authEvents = {
    onAuthFailure: (callback) => {
        window.addEventListener('auth-failure', callback);
    },
    offAuthFailure: (callback) => {
        window.removeEventListener('auth-failure', callback);
    },
    triggerAuthFailure: () => {
        window.dispatchEvent(new CustomEvent('auth-failure'));
    }
};

const handleError = (error) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';
        switch (status) {
            case 400:
                // alert(message || 'Bad Request');
                return {
                    success: false,
                    message: message,
                };
            case 401:
                // window.location.href = '/auth/login';
                localStorage.removeItem(DOKTA_ACCESS_TOKEN);
                localStorage.removeItem(DOKTA_ACCESS_USER);
                authEvents.triggerAuthFailure();
                return {
                    success: false,
                    message: message,
                };
                break;
            case 402:
                window.location.href = '/auth/login';
                return {
                    success: false,
                    message: message || 'Auth Required',
                };
            // break;
            case 404:
                toast(message || 'Page not found')
                break;
            case 500:
                return {
                    success: false,
                    message: message || 'Internal Server Error',
                };
                break;
            default:
                return {
                    success: false,
                    message: message,
                };
        }
    }
    else if (error.request) {
        return {
            success: false,
            message: 'No response from server',
        };
    }
    else {
        return {
            success: false,
            message: error.message || 'Unexpected error',
        };
    }
};

export const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            return {
                success: false,
                message: message,
            };
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        return handleError(error);
    }
};

export const post = async (url, data = {}) => {
    try {
        const response = await api.post(url, data);
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            return {
                success: false,
                message: message,
            };
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        return handleError(error);
    }
};

export const put = async (url, data = {}) => {
    try {
        const response = await api.put(url, data);
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            return {
                success: false,
                message: message,
            };
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        return handleError(error);
    }
};

export const del = async (url) => {
    try {
        const response = await api.delete(url);
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            return {
                success: false,
                message: message,
            };
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        return handleError(error);
    }
};

export async function setToken(token) {
    // let validToken = await token || await getValidToken();
    let validToken = token;
    if (validToken) {
        localStorage.setItem(DOKTA_ACCESS_TOKEN, token)
        // api.defaults.headers.common["Authorization"] = `Basic ${validToken}`
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}
