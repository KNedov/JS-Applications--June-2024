import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

let context = null;
const createTemp = (onCreate) => html` 
<section id="create">
    <div class="form">
        <h2>Add tattoo</h2>
        <form @submit=${onCreate} class="create-form">
            <input
                type="text"
                name="type"
                id="type"
                placeholder="Tattoo Type"
            />
            <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
            />
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
            ></textarea>
            <select id="user-type" name="user-type">
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                    First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
            </select>
            <button type="submit">Add tattoo</button>
        </form>
    </div>
</section>`;
export function createView(ctx) {
    context = ctx;
    ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({
    type,
    "image-url":imageUrl, 
    description, 
    "user-type":userType
  } 
  ) {
    if (!type || !imageUrl || !description || !userType )
        return window.alert("All fields are required");
    await dataService.create({
        type,
        imageUrl, 
        description, 
        userType
      } 
      );
    context.page.redirect("/dashboard");
}
