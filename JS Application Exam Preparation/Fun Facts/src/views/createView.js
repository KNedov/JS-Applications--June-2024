import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit =${onCreate}class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
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
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({category,'image-url':imageUrl,description,'additional-info':moreInfo}) {

  
    if (!category||!imageUrl||!description||!moreInfo)return window.alert('All fields are required')
    await dataService.create({category,imageUrl,description,moreInfo})
 context.page.redirect('/dashboard')
}