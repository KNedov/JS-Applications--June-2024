// TODO Endpoints
export const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/tattoos?sortBy=_createdOn%20desc",
  create: "/data/tattoos",
  search: (query) => `/data/tattoos?where=name%20LIKE%20%22${query}%22`,
  details: (id) => `/data/tattoos/${id}`,
  delete: (id) => `/data/tattoos/${id}`,
  own: (tattooId, userId) => `/data/tattoos?where=_id%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  like: '/data/likes',
  totalLikes: (tattooId) => `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`,
  userLikes: (tattooId, userId) => `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};