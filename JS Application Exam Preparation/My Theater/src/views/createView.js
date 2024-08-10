import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

let context = null;
const createTemp = (onCreate) => html`
<section id="createPage">
  <form @submit=${onCreate}class="create-form">
    <h1>Create Theater</h1>
    <div>
      <label for="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Theater name"
        value=""
      />
    </div>
    <div>
      <label for="date">Date:</label>
      <input id="date" name="date" type="text" placeholder="Month Day, Year" />
    </div>
    <div>
      <label for="author">Author:</label>
      <input id="author" name="author" type="text" placeholder="Author" />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
      ></textarea>
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="Image Url"
        value=""
      />
    </div>
    <button class="btn" type="submit">Submit</button>
  </form>
</section>`;
export function createView(ctx) {
  context = ctx;
  ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({
  title,
  date,
  author,
  imageUrl,
  description
}
) {
  if (!title || !date || !author || !imageUrl||!description)
    return window.alert("All fields are required");
  await dataService.create({
    title,
    date,
    author,
    imageUrl,
    description,
  }
  );
  context.page.redirect("/dashboard");
}
