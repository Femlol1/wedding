import React from 'react';

interface ModalProps {
  show: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, title, message, onClose, isLoading }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-md text-center max-w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        ) : (
          <>
            {title && <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>}
            {message && <p className="text-sm sm:text-base mt-2">{message}</p>}
            <button
              onClick={onClose}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
