import { get, post, put, del } from "./api.js";
// TODO
export const dataEndpoints = {
  getAll: "/data/cars?sortBy=_createdOn%20desc",
  create: `/data/cars`,
  details: (id) => `/data/cars/${id}`,
  edit: (id) => `/data/cars/${id}`,
  deleteData: (id) => `/data/cars/${id} `,
  edit: (id) => `/data/cars/${id}`,
  search: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`,
};

function getAll() {
  return get(dataEndpoints.getAll);
}
function details(id) {
  return get(dataEndpoints.details(id));
}
function create(data) {
  return post(dataEndpoints.create, data);
}
function edit(id, data) {
  return put(dataEndpoints.edit(id), data);
}
function delData(id) {
  return del(dataEndpoints.deleteData(id));
}
function search(query) {
  return get(dataEndpoints.search(query));
}
export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
};
