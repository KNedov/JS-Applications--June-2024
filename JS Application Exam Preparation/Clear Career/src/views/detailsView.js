import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner, getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context = null;
const detailsTemp = (
  data,
  hasUser,
  applyInfo,
  isOwner,
  onApply
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <p id="details-title">${data.title}</p>
    <p id="details-category">
      Category: <span id="categories">${data.category}</span>
    </p>
    <p id="details-salary">Salary: <span id="salary-number">${data.salary}</span></p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span
          >${data.description}</span
        >
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span
          >${data.requirements}</span
        >
      </div>
    </div>
    <p>Applications: <strong id="applications">${applyInfo.total}</strong></p>

    <!--Edit and Delete are only for creator-->
    ${hasUser
      ? buttonTemp(isOwner, data._id, applyInfo.applied, onApply)
      : null}
  </div>
</section>`;
const buttonTemp = (Owner, _id, applied, onApply) => html`
  <div id="action-buttons">
    ${Owner
      ? html` <a href="/edit/${_id}" id="edit-btn">Edit</a>
          <a
            @click=${onDelete.bind(_id)}
            href="javascript:void(0)"
            id="delete-btn"
            >Delete</a
          >`
      : applyBtnTemp(applied, onApply)}
  </div>
`;

const applyBtnTemp = (applied, onApply) =>
  html`${!applied
    ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn"
        >Apply</a
      >`
    : null}`;

export async function detailsView(ctx) {
  const _id = ctx.params._id;
  const [data, applyInfo] = await Promise.all([
    dataService.details(_id),
    dataService.getApply(_id),
  ]);
  const hasUser = Boolean(getUserData());
  const isOwner = Boolean(getOwner(data));

  ctx.render(detailsTemp(data, hasUser, applyInfo, isOwner, onApply));

  async function onApply() {
    // TODO
    const id = { offerId: _id };
    await dataService.apply(id);
    ctx.page.redirect(`/details/${_id}`);
  }
}
