// TODO Endpoints
export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/solutions?sortBy=_createdOn%20desc",
    create: "/data/solutions",
    search: (query) => `/data/solutions?where=name%20LIKE%20%22${query}%22`,
    details: (id) => `/data/solutions/${id}`,
    delete: (id) => `/data/solutions/${id}`,
    edit:(id)=>`/data/solutions/${id}`,
    own: (solutionId, userId) => `/data/solutions?where=_id%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    like: '/data/likes',
    totalLikes: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    userLikes: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};