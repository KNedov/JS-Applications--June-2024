import { clearUserData, setUserData } from '../util.js';
import { post } from './api.js';

const endpoints = {
    register: '/users',
    login: '/login',
    logout: '/logout'
};

/**
 * @param {string} username 
 * @param {string} password 
 */
export async function register(username, password) {
    const result = await post(endpoints.register, { username, password });

    const userData = {
        username,
        objectId: result.objectId,
        sessionToken: result.sessionToken
    };

    setUserData(userData);
}

/**
 * @param {string} username 
 * @param {string} password 
 */
export async function login(username, password) {
    const result = await post(endpoints.login, { username, password });

    const userData = {
        username: result.username,
        objectId: result.objectId,
        sessionToken: result.sessionToken
    };

    setUserData(userData);
}

export async function logout() {
    await post(endpoints.logout);

    clearUserData();
}