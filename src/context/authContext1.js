"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authEvents, post } from "@/lib/http";
import { getCache } from "@/app/action/redis.action";

const AuthContext = createContext();

const DOKTA_SEND_ACCESS_USER = process.env.NEXT_PUBLIC_DOKTA_SEND_ACCESS_USER || "DOKTA_SEND_ACCESS_USER";
const DOKTA_SEND_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DOKTA_SEND_ACCESS_TOKEN || "DOKTA_SEND_ACCESS_TOKEN";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [userId, setUserId] = useState('');
    const [contextLoading, setcontextLoading] = useState(true);

    // Initialize auth event listeners
    useEffect(() => {
        const handleAuthFailure = () => {
            handleLogout('Your session has expired. Please login again.');
        };

        authEvents.onAuthFailure(handleAuthFailure);

        return () => {
            authEvents.offAuthFailure(handleAuthFailure);
        };
    }, []);

    // Load user on mount
    useEffect(() => {
        loadUserFromCache();
    }, []);

      const loadUserFromCache = useCallback(async () => {
        try {
            setcontextLoading(true);
            const storedUserId = localStorage.getItem(DOKTA_SEND_ACCESS_USER);
            const storedToken = localStorage.getItem(DOKTA_SEND_ACCESS_TOKEN);
            if (storedUserId && storedToken) {
                setuserId(storedUserId);
                setUserToken(storedToken);
                const cachedUser = await getCache(storedUserId);
                if (cachedUser) {
                    setUser(cachedUser);
                    setcontextLoading(false);
                } else {
                    await logout()
                }
            }
            else {
                handleLogout("No authentication found")
            }
        } catch (error) {
            toast.error(`❌ Error loading user from cache:, ${error.message}`)
            await logout()
        } finally {
            setcontextLoading(false);
        }
    }, []);

    // Save user data consistently
    const saveUser = useCallback((userData) => {
        if (!userData) {
            console.error("❌ Cannot save null user data");
            return;
        }
        
        setUser(userData);
        
        // Store user ID separately for cache lookup
        if (userData.id) {
            localStorage.setItem(DOKTA_SEND_ACCESS_USER, userData.id);
            setUserId(userData.id);
        }
        
        // Store full user data if needed for offline access
        localStorage.setItem('user_full_data', JSON.stringify(userData));
    }, []);

    const saveUserToken = useCallback((token) => {
        if (!token) {
            console.error("❌ Cannot save null token");
            return;
        }
        
        setUserToken(token);
        localStorage.setItem(DOKTA_SEND_ACCESS_TOKEN, token);
    }, []);

    const saveUserId = useCallback((id) => {
        if (!id) {
            console.error("❌ Cannot save null user ID");
            return;
        }
        
        setUserId(id);
        localStorage.setItem(DOKTA_SEND_ACCESS_USER, id);
    }, []);

    // Clear all auth data consistently
    const clearAuthData = useCallback(() => {
        setUser(null);
        setUserToken(null);
        setUserId('');
        
        localStorage.removeItem(DOKTA_SEND_ACCESS_USER);
        localStorage.removeItem(DOKTA_SEND_ACCESS_TOKEN);
        localStorage.removeItem('user_full_data');
    }, []);

    const handleLogout = useCallback(async (message = '') => {
        if (message) {
            // Use a better notification system instead of alert
            console.warn(message);
            // Or integrate with your notification system
            // toast.warning(message);
        }

        await logout();
    }, []);

    const logout = useCallback(async () => {
        try {
            await post("auth/logout");
            clearAuthData();
            window.location.href = "/auth/login";
        } catch (err) {
            console.error("❌ Logout failed:", err);
            // Even if API fails, clear local data
            clearAuthData();
            window.location.href = "/auth/login";
        }
    }, [clearAuthData]);

    // Helper function to check if user is authenticated
    const isAuthenticated = useCallback(() => {
        return !!user && !!userToken;
    }, [user, userToken]);

    // Add event listener for storage changes (for multiple tabs)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === DOKTA_SEND_ACCESS_USER || e.key === DOKTA_SEND_ACCESS_TOKEN) {
                // Reload auth state when storage changes (other tab logged in/out)
                loadUserFromCache();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadUserFromCache]);

    // Provide auth status
    const value = {
        user,
        userToken,
        userId,
        contextLoading,
        saveUser,
        logout,
        saveUserToken,
        saveUserId,
        isAuthenticated,
        clearAuthData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    
    return context;
};

// Custom hook for common auth operations
export const useAuth = () => {
    const context = useAuthContext();
    
    return {
        ...context,
        // Add convenience methods
        login: async (credentials) => {
            // You can add login logic here
            // const response = await post("auth/login", credentials);
            // context.saveUser(response.user);
            // context.saveUserToken(response.token);
        },
        updateUserProfile: async (updates) => {
            // Update user profile logic
        }
    };
};