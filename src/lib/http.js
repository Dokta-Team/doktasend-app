import api, { DOKTA_ACCESS_TOKEN } from './axios';

const handleError = (error) => {
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';
        switch (status) {
            case 400:
                alert(message || 'Bad Request');
                break;
            case 401:
                window.location.href = '/auth/login';
                break;
            case 402:
                alert(message || 'Payment Required');
                break;
            case 500:
                alert(message || 'Internal Server Error');
                break;
            default:
                alert(message);
        }
    }
    else if (error.request) {
        console.log("Http error", error.status)
        // throw new Error('No response from server');
        alert('No response from server');
    }
    else {
        alert(error.message || 'Unexpected error');
    }
};

export const get = async (url, params = {}) => {
    try {
        const response = await api.get(url, { params });
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            throw new Error(message);
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        handleError(error);
    }
};

export const post = async (url, data = {}) => {
    try {
        const response = await api.post(url, data);
        if (response.statusText !== "OK") {
            const message = response?.data?.message || 'An error occurred';
            throw new Error(message);
        }
        return {
            success: true,
            message: response.data.message,
            payload: response.data.payload
        };
    } catch (error) {
        handleError(error);
    }
};

export const put = async (url, data = {}) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        handleError(error);
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
