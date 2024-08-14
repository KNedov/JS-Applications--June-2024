import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";

let id = null;
let context = null;
const editTemp = (onEdit, data) => html` <section id="edit">
    <div class="form">
        <h2>Edit Show</h2>
        <form @submit=${onEdit} class="edit-form">
            <input
                type="text"
                name="title"
                id="title"
                .value=${data.title}
                placeholder="TV Show title"
            />
            <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${data.imageUrl}
            />
            <input
                type="text"
                name="genre"
                id="genre"
                placeholder="Genre"
                .value=${data.genre}
            />
            <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                .value=${data.country}
            />
            <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
                .value=${data.details}
            ></textarea>
            <button type="submit">Edit Show</button>
        </form>
    </div>
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
    "image-url": imageUrl,
    genre,
    country,
    details,
}) {
    if (!title || !imageUrl || !genre || !country || !details)
        return window.alert("All field are required");

    await dataService.edit(id, {
        title,
        imageUrl,
        genre,
        country,
        details,
    });
    context.page.redirect(`/details/${id}`);
}
