import page from "../../../node_modules/page/page.mjs";
import { dataService } from "../data/dataService.js";
// TODO TEMPLATE

export async function onDelete(){
  
    await dataService.delData(this)
    page.redirect('/')
  
 
 
}
