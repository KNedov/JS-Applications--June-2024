import { api } from "../api/api.js"
import { dataEndpoints } from "./urls.js";
async function getAll() {
    return api.get(dataEndpoints.getAll)
 
 }
 async function create(data) {
    return api.post(dataEndpoints.create,data)
 }
 async function getDetails(id) {
    return api.get(dataEndpoints.details+id)
 }
 async function deleteDetails(id) {
    return await api.del(dataEndpoints.delete+id)
 }
 async function editDetails(id,data) {
    return await api.put(dataEndpoints.edit+id,data)
 }
 async function getSearchItem(query) {
    return await api.get(`data/fruits?where=name%20LIKE%20%22${query}%22`)
 }
export const dataService={
    getAll,
    create,
    getDetails,
    deleteDetails,
    editDetails,
    getSearchItem,
}