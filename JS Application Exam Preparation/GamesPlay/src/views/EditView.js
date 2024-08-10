import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
 <section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value="${data.title}">

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${data.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${data.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${data.imageUrl}">

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary" .value=${data.summary}></textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;
export async function editView(ctx) {
  context = ctx;
  const _id = ctx.params._id;
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit), data));
}
async function onEdit({title,category,maxLevel,imageUrl,summary}) {
  if (!title || !category || !maxLevel || !imageUrl || !summary )
    return window.alert("All field are required");

  await dataService.edit(id,{title,category,maxLevel,imageUrl,summary});
  context.page.redirect(`/details/${id}`);
}
