import { get, post, put,del} from "./api.js";

export const dataEndpoints = {
    getAll: "/data/characters?sortBy=_createdOn%20desc",
    create: `/data/characters`,
    details:(id)=> `/data/characters/${id}`,
    update:(id)=> `/data/characters/${id}`,
    deleteData:(id) => `/data/characters/${id} `,
    edit: (id) => `/data/characters/${id}`,
    search: (query) => `/data/characters?where=name%20LIKE%20%22${query}%22`,
  };

 function getAll() {
    return get(dataEndpoints.getAll)
}
function details(id) {
    return get(dataEndpoints.details(id))
}
function create(data) {
    return post(dataEndpoints.create,data)
}
function update(id,data) {
    return put(dataEndpoints.update(id),data)
}
function delData(id) {
    return del(dataEndpoints.deleteData(id))
}
export const dataService={
    getAll,
    details,
    create,
    update,
    delData,}