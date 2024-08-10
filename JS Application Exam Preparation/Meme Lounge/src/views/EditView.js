import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { notify } from "./notifyView.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html` <section id="edit-meme">
  <form @submit=${onEdit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" .value=${data.title} />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
        .value=${data.description}
      >
      </textarea
      >
      <label for="imageUrl">Image Url</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter Meme ImageUrl"
        name="imageUrl"
        .value=${data.imageUrl}
      />
      <input type="submit" class="registerbtn button" value="Edit Meme" />
    </div>
  </form>
</section>`;
export async function editView(ctx) {
  context = ctx;
  const _id = ctx.params._id;
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit), data));
}
async function onEdit({
  title,
  description,
  imageUrl
}
) {
  if (!title || !description || !imageUrl)
    return notify("All field are required");

  await dataService.edit(id,{
    title,
    description,
    imageUrl
  });
  context.page.redirect(`/details/${id}`);
}
