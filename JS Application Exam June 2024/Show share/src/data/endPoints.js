// TODO Endpoints
export 
  const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/shows?sortBy=_createdOn%20desc",
    create: "/data/shows",
    search: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`,
    details: (id) => `/data/shows/${id}`,
    delete: (id) => `/data/shows/${id}`,
    own: (showId, userId) =>
    `/data/shows?where=showId%3D%22${showId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  }