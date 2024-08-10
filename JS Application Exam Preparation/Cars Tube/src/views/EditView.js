import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
    <section id="edit-listing">
        <div class="container">
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr />

                <p>Car Brand</p>
                <input
                    type="text"
                    placeholder="Enter Car Brand"
                    name="brand"
                    value="${data.brand}"
                />

                <p>Car Model</p>
                <input
                    type="text"
                    placeholder="Enter Car Model"
                    name="model"
                    value="${data.model}"
                />

                <p>Description</p>
                <input
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    value="${data.description}"
                />

                <p>Car Year</p>
                <input
                    type="number"
                    placeholder="Enter Car Year"
                    name="year"
                    value="${data.year}"
                />

                <p>Car Image</p>
                <input
                    type="text"
                    placeholder="Enter Car Image"
                    name="imageUrl"
                    value="${data.imageUrl}"
                />

                <p>Car Price</p>
                <input
                    type="number"
                    placeholder="Enter Car Price"
                    name="price"
                    value="${data.price}"
                />

                <hr />
                <input type="submit" class="registerbtn" value="Edit Listing" />
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
async function onEdit({ brand, model, description, year, imageUrl, price }) {
    if (!brand || !model || !description || !year || !imageUrl || !price)
        return window.alert("All field are required");
    price = Number(price);
    year = Number(year);
    await dataService.edit(id, {
        brand,
        model,
        description,
        year,
        imageUrl,
        price,
    });
    context.page.redirect(`/details/${id}`);
}
