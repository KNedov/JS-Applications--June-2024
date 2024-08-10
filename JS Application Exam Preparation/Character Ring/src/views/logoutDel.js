import page from "../../../node_modules/page/page.mjs";


import { clearUserData } from "../utils.js";
import { userService } from "../data/userService.js";
import { dataService } from "../data/dataService.js";

export async function logout() {
  const response = userService.logout();
  clearUserData();
  await response;
  page.redirect("/index.html");
  
}
export async function onDelete(){
  debugger
  if (window.confirm("Do you really want to leave?")) {
    await dataService.delData(this)
    page.redirect('/dashboard')
  }
  return
 
}
