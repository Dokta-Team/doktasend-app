"use client";
import { post } from "@/lib/http";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
const DOKTA_ACCESS_USER = process.env.NEXT_DOKTA_ACCESS_USER
const DOKTA_ACCESS_TOKEN = process.env.DOKTA_ACCESS_TOKEN

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On load, try to read user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem(DOKTA_ACCESS_USER);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem(DOKTA_ACCESS_USER, JSON.stringify(userData));
    };

    const getSavedUser = () => {
        const storedUser = localStorage.getItem(DOKTA_ACCESS_USER);
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            return parsed;
        }
        return null;
    };

    const logout = () => {
        try {
            post('sponsor/logout')
            setUser(null);
            localStorage.removeItem(DOKTA_ACCESS_USER);
            localStorage.removeItem(DOKTA_ACCESS_TOKEN);
            window.location.href = "/auth/login";
        } catch (error) {
            alert("Failed to logout. Please try again.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, saveUser, logout, getSavedUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);