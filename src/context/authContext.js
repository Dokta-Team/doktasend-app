"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authEvents, post } from "@/lib/http";
import { getCache } from "@/app/action/redis.action";
import { toast } from "sonner";


const AuthContext = createContext();

const DOKTA_SEND_ACCESS_USER = process.env.NEXT_PUBLIC_DOKTA_SEND_ACCESS_USER || "DOKTA_SEND_ACCESS_USER";
const DOKTA_SEND_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DOKTA_SEND_ACCESS_TOKEN || "DOKTA_SEND_ACCESS_TOKEN";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState('')
    const [contextLoading, setContextLoading] = useState(true);
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
        loadUserFromCache()
    }, []);


    // const loadUserFromCache = useCallback(async () => {
    //     try {
    //         setcontextLoading(true);
    //         const storedUserId = localStorage.getItem(DOKTA_SEND_ACCESS_USER);
    //         // const storedToken = localStorage.getItem(DOKTA_SEND_ACCESS_TOKEN);
    //         if (storedUserId) {
    //             setuserId(storedUserId);
    //             setUserToken(storedToken);
    //             const cachedUser = await getCache(storedUserId);
    //             if (cachedUser) {
    //                 setUser(cachedUser);
    //                 setcontextLoading(false);
    //             } else {
    //                 await logout()
    //             }
    //         }
    //         else {
    //             handleLogout("No authentication found")
    //         }
    //     } catch (error) {
    //         toast.error(`❌ Error loading user from cache:, ${error.message}`)
    //         await logout()
    //     } finally {
    //         setcontextLoading(false);
    //     }
    // }, []);

    // Save user and persist


    const loadUserFromCache = useCallback(async () => {
        try {
            setContextLoading(true);
            const storedUserId = localStorage.getItem(DOKTA_SEND_ACCESS_USER);
            const storedToken = localStorage.getItem(DOKTA_SEND_ACCESS_TOKEN);

            // If no user ID, user is not logged in - just set loading to false
            if (!storedUserId) {
                // toast.error(`Logout and login again`);
                setContextLoading(false);
                if (window.location.pathname === '/auth/login') {
                    return
                }
                toast("Please log out", {
                    // description: "Success",
                    action: {
                        label: "Log out now",
                        onClick: () => logout(),
                    },
                })
                return;
            }

            // Set user ID and token from localStorage
            setUserId(storedUserId);
            setUserToken(storedToken);

            // Try to get user from Redis cache
            const cachedUser = await getCache(storedUserId);

            if (cachedUser) {
                setUser(cachedUser);
                setContextLoading(false);
            } else {
                toast.error(`Please login again`);
                setContextLoading(false);
            }

        } catch (error) {
            toast.error(`Error loading user: ${error.message}`);
            setContextLoading(false);
        }
    }, []);

    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem(DOKTA_SEND_ACCESS_USER, JSON.stringify(userData));
    };

    //   const saveUser = useCallback((userData) => {
    //     setUser(userData);
    //     // Store user ID for cache lookup
    //     if (userData?._id) {
    //         localStorage.setItem(DOKTA_SEND_ACCESS_USER, userData.id);
    //         setUserId(userData.id);
    //     }
    // }, []);

    const saveUserId = useCallback((id) => {
        setUserId(id);
        localStorage.setItem(DOKTA_SEND_ACCESS_USER, id);
    }, []);


    const saveUserToken = (userToken) => {
        setUserToken(userToken);
        localStorage.setItem(DOKTA_SEND_ACCESS_TOKEN, userToken);
    };

    const handleLogout = useCallback(async (message = '') => {
        if (message) {
            toast.warning(message);
        }
        await logout();
    }, []);



    const logout = useCallback(async () => {
        try {

            await post("auth/logout");
            // Clear local state
            setUser(null);
            setUserToken(null);
            setUserId('');

            // Clear localStorage
            localStorage.removeItem(DOKTA_SEND_ACCESS_USER);
            localStorage.removeItem(DOKTA_SEND_ACCESS_TOKEN);

            // Redirect to login
            window.location.href = "/auth/login";

        } catch (err) {
            toast.error(`Logout failed: ${err?.message}`);

            localStorage.removeItem(DOKTA_SEND_ACCESS_USER);
            localStorage.removeItem(DOKTA_SEND_ACCESS_TOKEN);
            window.location.href = "/auth/login";
        }
    }, [userToken]);

    const isAuthenticated = useCallback(() => {
        return !!user && !!userToken;
    }, [user, userToken]);

    const value = {
        user,
        setUser,
        userToken,
        userId,
        contextLoading,
        saveUser,
        logout,
        saveUserToken,
        saveUserId,
        isAuthenticated,
        // clearAuthData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
