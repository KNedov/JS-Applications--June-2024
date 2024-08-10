import * as api from "./api.js";
/*
All Furniture (GET): http://localhost:3030/data/catalog
Furniture Details (GET): http://localhost:3030/data/catalog/:id
My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
Create Furniture (POST): http://localhost:3030/data/catalog
Update Furniture (PUT): http://localhost:3030/data/catalog/:id
Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id
*/
const endpoints = {
  all: "/data/catalog",
  details: "/data/catalog/",
  myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
  create: '/data/catalog',
  edit: '/data/catalog/',
  delete: '/data/catalog/'
};

export async function getAll() {
  return api.get(endpoints.all);
}

export async function getById(id) {
  return api.get(endpoints.details + id);
}

export async function getMyItems(userId) {
  return api.get(endpoints.myItems(userId));
}

export async function createItem(data){
    return api.post(endpoints.create, data)
}

export async function editItem(id, data) {
    return api.put(endpoints.edit + id, data)
}

export async function deleteItem(id) {
    return api.del(endpoints.delete + id)
}