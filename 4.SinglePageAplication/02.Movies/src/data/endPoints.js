// TODO Endpoints
export const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/movies',
    create: '/data/movies',
    like: '/data/likes',
    edit: (id) => `/data/movies/${id}`,
    delete: (id) => `/data/movies/${id}`,
    details: (id) => `/data/movies/${id}`,
    total: (likeId) =>
      `/data/likes?where=movieId%3D%22${likeId}%22&distinct=_ownerId&count`,
    unlike: (likeId) => `/data/likes/${likeId}`,
    own: (likeId, userId) =>
      `/data/likes?where=movieId%3D%22${likeId}%22%20and%20_ownerId%3D%22${userId}%22`,
  }