import { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        message: "",
        type: "success", // success, error, info
        isVisible: false,
    });

    const showNotification = useCallback((message, type = "success") => {
        setNotification({
            message,
            type,
            isVisible: true,
        });

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    }, []);

    const hideNotification = useCallback(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notification,
                showNotification,
                hideNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
