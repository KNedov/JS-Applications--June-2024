import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form @submit=${onEdit} class="edit-form">
        <input type="text" name="title" id="job-title" placeholder="Title" .value=${data.title} />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          .value=${data.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          .value=${data.category}
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
          .value=${data.description}
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
          .value=${data.requirements}
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${data.salary} />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;
export async function editView(ctx) {
  context = ctx;
  const _id = ctx.params._id;
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit), data));
}
async function onEdit({
  title,
  imageUrl, 
  category, 
  description, 
  requirements, 
  salary
} 
) {
  if (!title || !imageUrl || !category || !description || !requirements || !salary)
    return window.alert("All field are required");

  await dataService.edit(id,{ title,
    imageUrl, 
    category, 
    description, 
    requirements, 
    salary
  });
  context.page.redirect(`/details/${id}`);
}
