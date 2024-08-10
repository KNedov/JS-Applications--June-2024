// TODO Endpoints
export const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/albums?sortBy=_createdOn%20desc',
    create: '/data/albums',
    likes: '/data/likes',
    details: (id) => `/data/albums/${id}`,
    delete: (id) => `/data/albums/${id}`,
    total: (albumId) =>
      `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    own: (albumId, userId) =>
      `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  }