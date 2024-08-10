import { clearUserData, getUserData } from '../util.js';

const hostname = 'https://parseapi.back4app.com';
const appId = 'mzZrkx6B4jlPPOx509xlYm1GVrPqurm4h55UFlq6';
const apiKey = 'iyQGlXfElDMPaRxt0zhgornhUIqbhiHAqix0y4og';

export async function request(method, url, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey
        }
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    const sessionToken = userData?.sessionToken;

    if (sessionToken) {
        options.headers['X-Parse-Session-Token'] = sessionToken;
    }

    try {
        const response = await fetch(hostname + url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = /** @param {string} url */ (url) => request('get', url);
export const post = /** @param {string} url @param {any} [data] */ (url, data) => request('post', url, data);
export const put = /** @param {string} url @param {any} [data] */ (url, data) => request('put', url, data);
export const del = /** @param {string} url */ (url) => request('delete', url);

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}