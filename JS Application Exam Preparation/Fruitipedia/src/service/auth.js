import { dataService } from "./dataService.js";
import { userService } from "./userService.js";

 function getAuthData() {
  return JSON.parse(localStorage.getItem("auth"));
}
 async function handleLogin(e) {
  const formData=getFormData(e)

  const email=formData.get("email")
  const password=formData.get("password")
  if (!email || !password) return window.alert('Error');
  return userService.login({email, password});
}
 async function handleRegister(e) {
const formData=getFormData(e)
  const email=formData.get('email')
  const password= formData.get('password')
  const repass= formData.get('re-password')

  if (!email || !password || password !== repass)return window.alert('Error');

  return userService.register({email, password});
}
 async function handleCreate(e) {
  const formData=getFormData(e)
  const data= Object.fromEntries(formData);
  const {name,imageUrl,description,nutrition}=data
  if (!name || !imageUrl ||!nutrition||!description) return window.alert('Error');

  return dataService.create({name,imageUrl,description,nutrition});
}
async function handleDetails(id) {
 return await dataService.getDetails(id)
}
async function editDetails(id) {
  return await dataService.getDetails(id)
}
async function handleEditDetails(e,id) {
  const formData=getFormData(e)

  const data= Object.fromEntries(formData);
  
  const {name,imageUrl,description,nutrition}=data
  if (!name || !imageUrl ||!nutrition||!description) return window.alert('Error');
  return await dataService.editDetails(id,{name,imageUrl,description,nutrition})
}
async function handleSearch(e) {
 const formData=getFormData(e)
  const data= Object.fromEntries(formData);
  const search=data.search
  if (!search) {
    return window.alert('Error')
  }
  return await dataService.getSearchItem(search)
}
function getFormData(e) {
  e.preventDefault();
  return new FormData(e.target);
}



export const auth = {
  getAuthData,
  handleLogin,
  handleRegister,
  handleCreate,
  handleDetails,
  editDetails,
  handleEditDetails,
  handleSearch

};
