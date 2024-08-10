import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({name,imageUrl,category,description,date}) {

  
    if (!name||!imageUrl||!category||!description||!date)return window.alert('All fields are required')
    await dataService.create({name,imageUrl,category,description,date})
 context.page.redirect('/dashboard')
}