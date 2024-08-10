// TODO Endpoints
export const endpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
    catalog: "/data/events?sortBy=_createdOn%20desc",
    create: "/data/events",
    going: "/data/going",
    details: (id) => `/data/events/${id}`,
    delete: (id) => `/data/events/${id}`,
    total: (eventId) =>
      `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    own: (eventId, userId) =>
      `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  };