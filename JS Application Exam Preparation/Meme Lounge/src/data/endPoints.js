// TODO Endpoints
export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/memes?sortBy=_createdOn%20desc",
    create: "/data/memes",
    details: (id) => `/data/memes/${id}`,
    delete: (id) => `/data/memes/${id}`,
    edit:(id)=>`/data/memes/${id}`,
    profile:(id)=>`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
   
};
