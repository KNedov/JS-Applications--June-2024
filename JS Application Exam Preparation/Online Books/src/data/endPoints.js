// TODO Endpoints
export const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/books?sortBy=_createdOn%20desc',
  create: '/data/books',
  like: '/data/likes',
  details: (id) => `/data/books/${id}`,
  profile: (id) => `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`,
  total: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
  own: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}