import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html` <section id="editPage">
  <form @submit=${onEdit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        value="${data.title}"
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input
        id="date"
        name="date"
        type="text"
        placeholder="Month Day, Year"
        value="${data.date}"
      />
    </div>
    <div>
      <label for="author">Author:</label>
      <input
        id="author"
        name="author"
        type="text"
        placeholder="Author"
        value="${data.author}"
      />
    </div>
    <div>
      <label for="description">Theater Description:</label>
      <textarea id="description" name="description" placeholder="Description" .value=${data.description}></textarea
      >
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value="${data.imageUrl}"
      />
    </div>
    <button class="btn" type="submit">Submit</button>
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
    date,
    author,
    imageUrl,
    description
  }
  ) {
  if (!title || !date || !author || !imageUrl||!description)
    return window.alert("All field are required");

  await dataService.edit(id, {
    title,
    date,
    author,
    imageUrl,
    description
  }
  );
  context.page.redirect(`/details/${id}`);
}
