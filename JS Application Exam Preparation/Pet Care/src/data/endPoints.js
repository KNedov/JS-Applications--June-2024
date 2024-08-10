// TODO Endpoints
export  const endpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  catalog: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
  create: '/data/pets',
  donation: '/data/donation',
  details: (id) => `/data/pets/${id}`,
  delete: (id) => `/data/pets/${id}`,
  total: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  own: (petId, userId) =>
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}