/**
 * @param {(data: any, form?: HTMLFormElement) => void} callback 
 * @returns {(event: SubmitEvent) => void}
 */
export function createSubmitHandler(callback) {
    return async function (event) {
        event.preventDefault();

        const form = /** @type {HTMLFormElement} */ (event.target);

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            disableForm(form);
            await callback(data, form);
        } catch (err) {
            // Do nothing
        } finally {
            enableForm(form);
        }
    };
}

export function setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('userData'));
}

export function clearUserData() {
    localStorage.removeItem('userData');
}

export function disableForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select, button');

    for (let input of inputs) {
        input.disabled = true;
    }
}

export function enableForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select, button');

    for (let input of inputs) {
        input.disabled = false;
    }
}