import page from "../../../node_modules/page/page.mjs";
import { dataService } from "../data/dataService.js";
// TODO TEMPLATE

export async function onDelete(){
  if (window.confirm("Do you really want to leave?")) {
    await dataService.delData(this)
    page.redirect('/')
  }
  return
 
}
