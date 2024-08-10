export function createSubmitHandler(callback) {
    return function (event) {
       
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, event.target);
    };
}

export function setUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
    localStorage.removeItem('user');
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
export function getOwner(data) {
    console.log();
    
    
    const user=getUserData()
    const _id=user?._id
    console.log(data._ownerId);
    console.log(_id)
    debugger
    
    return data?._ownerId===_id
}
