import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

let context = null;
const createTemp = (onCreate) => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit =${onCreate} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`;
export function createView(ctx) {
  context = ctx;
  ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({ brand, model, imageUrl, release, designer, value }) {
  if (!brand || !model || !imageUrl || !release || !designer || !value)
    return window.alert("All fields are required");
  await dataService.create({brand,model,imageUrl,release,designer,value});
  context.page.redirect("/dashboard");
}
