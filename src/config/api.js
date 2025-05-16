import toast from "react-hot-toast";

const API_CONFIG = {
    AUTH_SERVICE: import.meta.env.VITE_REACT_APP_AUTH_SERVICE_URL,
    TRANSACTION_SERVICE: import.meta.env.VITE_REACT_APP_TRANSACTION_SERVICE_URL
};

export const createApiClient = (baseURL) => {
    return async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(`${baseURL}${endpoint}`, config);
            if (!response.ok) {
                // Handle different error status codes
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message || 'An error occurred';
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log('error', error)
            toast.error(error.message, {
                duration: 4000,
                style: {
                    background: '#ff4b4b',
                    color: '#fff',
                },
            });
            throw error;
        }
    };
};

export const authApi = createApiClient(API_CONFIG.AUTH_SERVICE);
export const transactionApi = createApiClient(API_CONFIG.TRANSACTION_SERVICE);