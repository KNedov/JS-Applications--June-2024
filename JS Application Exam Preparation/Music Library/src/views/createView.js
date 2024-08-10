import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`
<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form @submit=${onCreate} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({singer,album,imageUrl,release,label,sales}) {

  
    if (!singer||!album||!imageUrl||!release||!label||!sales)return window.alert('All fields are required')
    await dataService.create({singer,album,imageUrl,release,label,sales})
 context.page.redirect('/dashboard')
}