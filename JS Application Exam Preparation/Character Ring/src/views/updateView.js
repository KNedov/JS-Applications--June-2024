import { dataService } from "../data/dataService.js";
import { render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import page from "../../../node_modules/page/page.mjs";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let id = null;
const updateTemp=(onUpdate,data)=>html`
<section id="edit">
          <div class="form">
            <img class="border" src="/images/border.png" alt="">
            <h2>Edit Character</h2>
            <form @submit=${onUpdate} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              .value=${data.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${data.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
            .value=${data.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${data.moreInfo}
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="/images/border.png" alt="">
          </div>
        </section>
`
export async function updateView(ctx) {
  const _id = ctx.params._id
  id = _id;
  const data = await dataService.details(_id);
  
  
  
  render(updateTemp(createSubmitHandler(onUpdate),data));
}
async function onUpdate(
  { category, "image-url": imageUrl, description, "additional-info": moreInfo },
  form
) {
  console.log(category,imageUrl,description,moreInfo);
  debugger
  if (!category || !imageUrl || !description || !moreInfo)
    return window.alert("All field are required");

  await dataService.update(id, { category, imageUrl, description, moreInfo });
  page.redirect(`/details/${id}`);
}
