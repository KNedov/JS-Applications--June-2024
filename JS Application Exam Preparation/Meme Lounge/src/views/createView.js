import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
import { notify } from "./notifyView.js";

let context = null;
const createTemp = (onCreate) => html` <section id="create-meme">
  <form @submit=${onCreate} id="create-form">
    <div class="container">
      <h1>Create Meme</h1>
      <label for="title">Title</label>
      <input id="title" type="text" placeholder="Enter Title" name="title" />
      <label for="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter Description"
        name="description"
      ></textarea>
      <label for="imageUrl">Meme Image</label>
      <input
        id="imageUrl"
        type="text"
        placeholder="Enter meme ImageUrl"
        name="imageUrl"
      />
      <input type="submit" class="registerbtn button" value="Create Meme" />
    </div>
  </form>
</section>`;
export function createView(ctx) {
  context = ctx;
  ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({
  title,
  description,
  imageUrl
}
) {
  if (!title || !description || !imageUrl )
    return notify("All fields are required");
  await dataService.create({
    title,
    description,
    imageUrl
  }
  );
  context.page.redirect("/dashboard");
}
