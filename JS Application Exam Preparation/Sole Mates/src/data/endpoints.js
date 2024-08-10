export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/shoes?sortBy=_createdOn%20desc",
    create: "/data/shoes",
    details: (id) => `/data/shoes/${id}`,
    delete: (id) => `/data/shoes/${id}`,
    search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`,
  }