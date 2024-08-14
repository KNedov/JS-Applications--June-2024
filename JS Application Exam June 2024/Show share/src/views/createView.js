import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

let context = null;
const createTemp = (onCreate) => html` <section id="create">
    <div class="form">
        <h2>Add Show</h2>
        <form @submit=${onCreate} class="create-form">
            <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
            />
            <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
            />
            <input type="text" name="genre" id="genre" placeholder="Genre" />
            <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
            />
            <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
            ></textarea>
            <button type="submit">Add Show</button>
        </form>
    </div>
</section>`;
export function createView(ctx) {
    context = ctx;
    ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({
    title,
    "image-url": imageUrl,
    genre,
    country,
    details,
}) {
    if (!title || !imageUrl || !genre || !country || !details)
        return window.alert("All fields are required");
    await dataService.create({
        title,
        imageUrl,
        genre,
        country,
        details,
    });
    context.page.redirect("/dashboard");
}
