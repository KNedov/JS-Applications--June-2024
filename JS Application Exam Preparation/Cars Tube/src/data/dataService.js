import { get, post, put, del } from "./api.js";
// TODO
import { endpoints } from "./endpoints.js";
import {getUserData} from "../utils.js"

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
function profile() {
  const userData=getUserData()
  const id=userData._id
  return get(endpoints.profile(id));
}
export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
  profile,
};
