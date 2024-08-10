import { getUserData } from "../utils.js";
import { get, post, put, del } from "./api.js";
// TODO
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
  return put(endpoints.details(id), data);
}
function delData(id) {
  return del(endpoints.delete(id));
}
function search(query) {
  return get(endpoints.search(query));
}
function apply(id) {
  return post(endpoints.applications,id)
}
async function getApply(detailsId) {
  const userData=getUserData()

  const requests=[get(endpoints.total(detailsId))]
  if (userData) {
      requests.push(get(endpoints.own(detailsId,userData._id)))
  }
  const [total,applied]=await Promise.all(requests)
  return{
      total,
      applied:Boolean(applied)
  }
}
export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
  apply,
  getApply
};
