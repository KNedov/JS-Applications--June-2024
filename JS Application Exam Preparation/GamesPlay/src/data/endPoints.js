// TODO Endpoints
export const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/games?sortBy=_createdOn%20desc&distinct=category',
  allGames: '/data/games?sortBy=_createdOn%20desc',
  create: '/data/games',
  details: (id) => `/data/games/${id}`,
  delete: (id) => `/data/games/${id}`,
  comments: (id) => `/data/comments?where=gameId%3D%22${id}%22`,
  postComments: '/data/comments'
};