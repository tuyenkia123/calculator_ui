import {authApi} from '../config/api';

export const authService = {
    login: (credentials) =>
        authApi('/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),

    register: (credentials) =>
        authApi('/register', {
            method: 'POST',
            body: JSON.stringify(credentials)
        })
};