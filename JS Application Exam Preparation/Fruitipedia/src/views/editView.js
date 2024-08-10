import { html } from "../../node_modules/lit-html/lit-html.js";
import { auth } from "../service/auth.js";

let context=null
const editTemp=(data)=>html`
 <section id="edit">
          <div class="form" >
            <h2>Edit Fruit</h2>
            <form @submit= ${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                .value=${data.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${data.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${data.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${data.nutrition}
              ></textarea>
              <button  type="submit">post</button>
            </form>
          </div>
        </section>`
export async function showEditView(ctx) {
    context=ctx
    const id =ctx.params._id
    const data=await auth.editDetails(id)
    
    ctx.render(editTemp(data))
}
async function onSubmit(e) {
    const id =context.params._id
   await auth.handleEditDetails(e,id)
   e.target.reset()
   context.goTo(`/details/${id}`)

}