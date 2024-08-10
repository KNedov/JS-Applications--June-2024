import { html } from "../../node_modules/lit-html/lit-html.js";

import { auth } from "../service/auth.js";

let context=null
const createTemp=html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>`
export async function showCreateView(ctx) {
    context=ctx
    ctx.render(createTemp)
}
async function onSubmit(e) {
   await auth.handleCreate(e)
context.goTo('/dashboard')
}