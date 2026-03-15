import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "flex items-start p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200`;
      case 'error':
        return `${baseStyles} bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200`;
      case 'info':
        return `${baseStyles} bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200`;
      default:
        return `${baseStyles} bg-gray-50 dark:bg-gray-900/20 border-gray-500 text-gray-800 dark:text-gray-200`;
    }
  };

  const getIcon = () => {
    const iconClasses = "w-5 h-5 flex-shrink-0";
    
    switch (type) {
      case 'success':
        return <FiCheckCircle className={`${iconClasses} text-green-500`} />;
      case 'error':
        return <FiXCircle className={`${iconClasses} text-red-500`} />;
      case 'warning':
        return <FiAlertTriangle className={`${iconClasses} text-yellow-500`} />;
      case 'info':
        return <FiInfo className={`${iconClasses} text-blue-500`} />;
      default:
        return <FiInfo className={`${iconClasses} text-gray-500`} />;
    }
  };

  const getCloseButtonStyles = () => {
    const baseStyles = "ml-auto flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors";
    
    switch (type) {
      case 'success':
        return `${baseStyles} hover:bg-green-200 dark:hover:bg-green-800 text-green-600 dark:text-green-400`;
      case 'error':
        return `${baseStyles} hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400`;
      case 'warning':
        return `${baseStyles} hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-600 dark:text-yellow-400`;
      case 'info':
        return `${baseStyles} hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400`;
      default:
        return `${baseStyles} hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400`;
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="shrink-0 mr-3 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        {message && (
          <p className="text-sm opacity-90 leading-relaxed">{message}</p>
        )}
      </div>
      
      <button
        onClick={() => onClose(id)}
        className={getCloseButtonStyles()}
        aria-label="Close notification"
      >
        <FiX className="w-3 h-3" />
      </button>
    </div>
  );
};

export default Toast; 