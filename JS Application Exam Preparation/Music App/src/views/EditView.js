import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
    <section class="editPage">
        <form @submit=${onEdit}>
            <fieldset>
                <legend>Edit Album</legend>

                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input
                        id="name"
                        name="name"
                        class="name"
                        type="text"
                        value="${data.name}"
                    />

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input
                        id="imgUrl"
                        name="imgUrl"
                        class="imgUrl"
                        type="text"
                        value="${data.imgUrl}"
                    />

                    <label for="price" class="vhide">Price</label>
                    <input
                        id="price"
                        name="price"
                        class="price"
                        type="text"
                        value="${data.price}"
                    />

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input
                        id="releaseDate"
                        name="releaseDate"
                        class="releaseDate"
                        type="text"
                        value="${data.releaseDate}"
                    />

                    <label for="artist" class="vhide">Artist</label>
                    <input
                        id="artist"
                        name="artist"
                        class="artist"
                        type="text"
                        value="${data.artist}"
                    />

                    <label for="genre" class="vhide">Genre</label>
                    <input
                        id="genre"
                        name="genre"
                        class="genre"
                        type="text"
                        value="${data.genre}"
                    />

                    <label for="description" class="vhide">Description</label>
                    <textarea
                        name="description"
                        class="description"
                        rows="10"
                        cols="10"
                        .value=${data.description}
                    ></textarea>

                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
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
async function onEdit({
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description
  }
  ) {
    if ((!name || !imgUrl || !price || !releaseDate || !artist|| !genre||!description))
        return window.alert("All field are required");

    await dataService.edit(id,{
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
      });
    context.page.redirect(`/details/${id}`);
}
