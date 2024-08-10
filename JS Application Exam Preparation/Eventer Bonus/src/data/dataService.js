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
function going(id) {
  return post(endpoints.going,id)
}
async function getGoing(eventId) {
  const userData=getUserData()

  const requests=[get(endpoints.total(eventId))]
  if (userData) {
      requests.push(get(endpoints.own(eventId,userData._id)))
  }
  const [goingCount,isGoing]=await Promise.all(requests)
  return{
      goingCount,
      isGoing:Boolean(isGoing)
  }
}
export const dataService = {
  getAll,
  details,
  create,
  edit,
  delData,
  search,
  going,
  getGoing
};
