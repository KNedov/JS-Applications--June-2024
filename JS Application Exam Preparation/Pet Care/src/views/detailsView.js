import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner, getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context = null;
const detailsTemp = (
  data,
  hasUser,
  donateInfo,
  isOwner,
  onDonate
) => html` <section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="./images/Shiba-Inu.png" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${data.name}</h1>
        <h3>Breed: ${data.breed}</h3>
        <h4>Age: ${data.age}</h4>
        <h4>Weight: ${data.weight}</h4>
        <h4 class="donation">Donation: ${donateInfo.donates*100}$</h4>
      </div>

      <!--Edit and Delete are only for creator-->
      ${hasUser
        ? buttonTemp(isOwner, data._id, donateInfo.didUserDonate, onDonate)
        : null}
    </div>
  </div>
</section>`;
const buttonTemp = (Owner, _id, didUserDonate, onDonate) => html`
  <div class="actionBtn">
    ${Owner
      ? html` <a href="/edit/${_id}" class="edit">Edit</a>
          <a
            @click=${onDelete.bind(_id)}
            href="javascript:void(0)"
            class="remove"
            >Delete</a>
          `
      : donateBtnTemp(didUserDonate, onDonate)}
  </div>
`;

const donateBtnTemp = (didUserDonate, onDonate) =>
  html`${didUserDonate==0
    ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate"
        >Donate</a
      >`
    : null}`;

export async function detailsView(ctx) {
  const _id = ctx.params._id;
  const [data, donateInfo] = await Promise.all([
    dataService.details(_id),
    dataService.getDonates(_id),
  ]);
  const hasUser = Boolean(getUserData());
  const isOwner = Boolean(getOwner(data));

  ctx.render(detailsTemp(data, hasUser, donateInfo, isOwner, onDonate));

  async function onDonate() {
    // TODO
    const id = { petId: _id };
    await dataService.donate(id);
    ctx.page.redirect(`/details/${_id}`);
  }
}
