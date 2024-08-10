import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`
<section id="add-movie" class="view-section">
        <form @submit=${onCreate}
          id="add-movie-form"
          class="text-center border border-light p-5"
          action="#"
          method=""
        >
          <h1>Add Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Title"
              name="title"
              .value=""
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea
              class="form-control"
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              name="img"
              value=""
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({title,description,img}) {

  
    if (!title||!description||!img)return window.alert('All fields are required')
    await dataService.create({title,description,img})
 context.page.redirect('/')
}