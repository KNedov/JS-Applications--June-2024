export const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/cars?sortBy=_createdOn%20desc',
    create: '/data/cars',
    details: (id) => `/data/cars/${id}`,
    delete: (id) => `/data/cars/${id}`,
    profile: (id) => `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
    search: (query) => `/data/cars?where=year%3D${query}`
};

