import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import Overlay from './Overlay';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-500',
          button: 'bg-red-500 hover:bg-red-600 text-white',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'warning':
        return {
          icon: 'text-yellow-500',
          button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'info':
        return {
          icon: 'text-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600 text-white',
          border: 'border-blue-200 dark:border-blue-800'
        };
      default:
        return {
          icon: 'text-red-500',
          button: 'bg-red-500 hover:bg-red-600 text-white',
          border: 'border-red-200 dark:border-red-800'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Overlay onClick={onCancel}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-auto transform transition-all duration-300 scale-100 border-l-4 border-red-500 dark:border-red-400" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <FiAlertTriangle className={`w-5 h-5 ${styles.icon}`} />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FiX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="px-4 py-2 text-sm"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm ${styles.button}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default ConfirmationModal; 