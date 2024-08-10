export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
    create: "/data/albums",
    details: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
};
