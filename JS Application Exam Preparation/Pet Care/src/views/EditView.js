import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
   <section id="editPage">
            <form @submit=${onEdit} class="editForm">
                <img src="/images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="${data.name}" >
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="${data.breed}">
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="${data.age}">
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="${data.weight}">
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${data.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
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
async function onEdit({
  name,
  breed,
  age,
  weight,
  image
}
) {
  if (!name || !breed || !age || !weight || !image)
    return window.alert("All field are required");

  await dataService.edit(id,{
    name,
    breed,
    age,
    weight,
    image
  });
  context.page.redirect(`/details/${id}`);
}
