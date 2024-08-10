// TODO Endpoints
export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/cyberpunk?sortBy=_createdOn%20desc",
    create: "/data/cyberpunk",
    details: (id) => `/data/cyberpunk/${id}`,
    delete: (id) => `/data/cyberpunk/${id}`,
    edit:(id)=>`/data/cyberpunk/${id}`,
   
};
