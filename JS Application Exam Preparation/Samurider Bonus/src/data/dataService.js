import { get, post, put, del } from "./api.js";
// TODO
import { endpoints } from "./endpoints.js";

function getAll() {
  return get(endpoints.catalog);
}
function details(id) {
  return get(endpoints.details(id));
}
function create(data) {
  return post(endpoints.create, data);
}
function edit(id, data) {
  return put(endpoints.details(id), data);
}
function delData(id) {
  return del(endpoints.delete(id));
}
function search(query) {
  return get(endpoints.search(query));
}
export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
};
