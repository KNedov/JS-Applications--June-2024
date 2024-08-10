import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";
import { auth } from "../service/auth.js";
import { userHelper } from "../service/userHelper.js";

let context = null;
const detailsTemp = (details, isOwner) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details" src="../..${details.imageUrl}" alt="example1" />
    <p id="details-title">${details.name}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p>${details.description}</p>
        <p id="nutrition">Nutrition</p>
        <p id="details-nutrition">${details.nutrition}</p>
      </div>
      <!--Edit and Delete are only for creator-->
      ${isOwner
        ? html` <div id="action-buttons">
            <a href="/edit/${details._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} data-id=${details._id} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
        : null}
    </div>
  </div>
</section>`;

export async function showDetailView(ctx) {
  context = ctx;
  const { _id } = ctx.params;

  const details = await auth.handleDetails(_id);
  const isOwner = userHelper.isOwner(details._ownerId);
  ctx.render(detailsTemp(details, isOwner));
}
async function onDelete(e) {
  const id = e.target.dataset.id;
  await dataService.deleteDetails(id);
    context.goTo("/dashboard");
  
}
