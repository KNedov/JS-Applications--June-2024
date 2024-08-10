// TODO Endpoints
export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/facts?sortBy=_createdOn%20desc",
    create: "/data/facts",
    search: (query) => `/data/facts?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `/data/facts/${id}`,
    delete: (id) => `/data/facts/${id}`,
    own: (factId, userId) => `/data/facts?where=_id%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    like: '/data/likes',
    totalLikes: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    userLikes: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};