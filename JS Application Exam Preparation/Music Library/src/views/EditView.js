import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          .value=${data.singer}
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          .value=${data.album}
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          .value=${data.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          .value=${data.release}
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          .value=${data.label}
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          .value=${data.sales}
        />

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
async function onEdit({ singer, album, imageUrl, release, label, sales }) {
  if (!singer || !album || !imageUrl || !release || !label || !sales)
    return window.alert("All field are required");

  await dataService.edit(id, {
    singer,
    album,
    imageUrl,
    release,
    label,
    sales,
  });
  context.page.redirect(`/details/${id}`);
}
