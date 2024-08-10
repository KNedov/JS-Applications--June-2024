// TODO Endpoints
export const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
  create: '/data/theaters',
  like: '/data/likes',
  details: (id) => `/data/theaters/${id}`,
  delete: (id) => `/data/theaters/${id}`,
  profile: (id) => `/data/theaters?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
  total: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  own: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}