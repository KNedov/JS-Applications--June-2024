
import { get, post, put, del } from "./api.js";

import { endpoints } from "./endPoints.js";

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
  return put(endpoints.edit(id), data);
}
function delData(id) {
  return del(endpoints.delete(id));
}
function own(query) {
  return get(endpoints.search(query));
}


export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  own,
 
};
