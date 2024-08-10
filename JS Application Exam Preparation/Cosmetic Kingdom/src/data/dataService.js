import { get, post, put,del} from "./api.js";
// TODO
export const dataEndpoints = {
    getAll: "/data/products?sortBy=_createdOn%20desc",
    create: `/data/products`,
    details:(id)=> `/data/products/${id}`,
    edit:(id)=> `/data/products/${id}`,
    deleteData:(id) => `/data/products/${id} `,
    edit: (id) => `/data/products/${id}`,
   
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
function edit(id,data) {
    return put(dataEndpoints.edit(id),data)
}
function delData(id) {
    return del(dataEndpoints.deleteData(id))
}
export const dataService={
    getAll,
    details,
    create,
    edit,
    delData,}