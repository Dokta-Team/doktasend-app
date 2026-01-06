"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { authEvents, post } from "@/lib/http";


const AuthContext = createContext();

const DOKTA_ACCESS_USER = process.env.NEXT_PUBLIC_DOKTA_ACCESS_USER;
const DOKTA_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DOKTA_ACCESS_TOKEN;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    // Load user from localStorage once on mount

    useEffect(() => {
        const handleAuthFailure = () => {
            handleLogout('Your session has expired. Please login again.');
        };

        authEvents.onAuthFailure(handleAuthFailure);

        return () => {
            authEvents.offAuthFailure(handleAuthFailure);
        };
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem(DOKTA_ACCESS_USER);
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    // Save user and persist
    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem(DOKTA_ACCESS_USER, JSON.stringify(userData));
    };

    const saveUserToken = (userToken) => {
        setUserToken(userToken);
        localStorage.setItem(DOKTA_ACCESS_TOKEN, userToken);
    };

    const handleLogout = async (message = '') => {
        if (message) {
            alert(message);
        }

        setUser(null);
        await logout()
    };
    // Logout user
    const logout = async () => {
        try {
            await post("sponsor/logout"); // API call
            setUser(null);
            localStorage.removeItem(DOKTA_ACCESS_USER);
            localStorage.removeItem(DOKTA_ACCESS_TOKEN);
            window.location.href = "/auth/login";
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userToken, saveUser, logout, saveUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
