import { dataService } from "../data/dataService.js";
import {render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import page from "../../../node_modules/page/page.mjs";
import {html} from "../../../node_modules/lit-html/lit-html.js";

const createTemp=(onCreate)=>html` <section id="create">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Add Character</h2>
  <form @submit= ${onCreate} class="create-form">
    <input
      type="text"
      name="category"
      id="category"
      placeholder="Character Type"
      
    />
    <input
      type="text"
      name="image-url"
      id="image-url"
      placeholder="Image URL"
      
    />
    <textarea
    id="description"
    name="description"
    placeholder="Description"
    rows="2"
    cols="10"
    
  ></textarea>
  <textarea
    id="additional-info"
    name="additional-info"
    placeholder="Additional Info"
    rows="2"
    cols="10"
    
  ></textarea>
    <button type="submit">Add Character</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`
export function createView() {
    render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({category,'image-url':imageUrl,description,'additional-info':moreInfo}) {
    if (!category||!imageUrl||!description||!moreInfo)return window.alert('All fields are required')
    await dataService.create({category,imageUrl,description,moreInfo})
 page.redirect('/dashboard')
}