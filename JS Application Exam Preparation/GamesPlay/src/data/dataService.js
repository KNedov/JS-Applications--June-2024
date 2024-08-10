import { getUserData } from "../utils.js";
import { get, post, put, del } from "./api.js";
// TODO
import { endpoints } from "./endPoints.js";

function getAll() {
  return get(endpoints.allGames);
}
function getCatalog() {
  return get(endpoints.catalog)
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
function postComent(data) {
  return post(endpoints.postComments,data)
}
async function getComents(gameId) {
 return get(endpoints.comments(gameId))
  }

export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
  postComent,
  getComents,
  getCatalog
};
