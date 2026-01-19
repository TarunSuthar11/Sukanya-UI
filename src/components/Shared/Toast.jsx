import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

const Toast = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    const icons = {
        success: <FiCheckCircle className="text-xl text-green-500" />,
        error: <FiAlertCircle className="text-xl text-red-500" />,
        info: <FiInfo className="text-xl text-blue-500" />,
    };

    const borders = {
        success: "border-green-500/20",
        error: "border-red-500/20",
        info: "border-blue-500/20",
    };

    const backgrounds = {
        success: "bg-green-50",
        error: "bg-red-50",
        info: "bg-blue-50",
    };

    return (
        <AnimatePresence>
            {notification.isVisible && (
                <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none pt-24 md:pt-28">
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md bg-white border ${borders[notification.type]} min-w-[300px] max-w-md`}
                    >
                        <div className={`p-2 rounded-full ${backgrounds[notification.type]}`}>
                            {icons[notification.type]}
                        </div>

                        <div className="flex-1">
                            <p className="font-medium text-neutral-800 text-sm md:text-base">
                                {notification.message}
                            </p>
                        </div>

                        <button
                            onClick={hideNotification}
                            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            <FiX />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
