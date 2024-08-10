export const endpoints=
{register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/motorcycles?sortBy=_createdOn%20desc",
    create: "/data/motorcycles",
    search: (query) => `/data/motorcycles?where=model%20LIKE%20%22${query}%22`,
    details: (id) => `/data/motorcycles/${id}`,
    delete: (id) => `/data/motorcycles/${id}`}