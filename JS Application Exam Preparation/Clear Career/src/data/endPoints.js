// TODO Endpoints
export const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  catalog: "/data/offers?sortBy=_createdOn%20desc",
  create: "/data/offers",
  applications: "/data/applications",
  details: (id) => `/data/offers/${id}`,
  delete: (id) => `/data/offers/${id}`,
  total: (offerId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
  own: (offerId, userId) =>
    `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};