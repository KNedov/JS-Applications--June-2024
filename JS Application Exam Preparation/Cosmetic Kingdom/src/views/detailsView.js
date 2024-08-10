import { dataService } from "../data/dataService.js";
import { getBuyData, buy } from "../data/buy.js";
import { getUserData, getOwner } from "../utils.js";
import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
let context=null
const detailsTemp = (
  data, hasUser, buyInfo, isOwner, onBuy
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <p id="details-title">${data.name}</p>
    <p id="details-category">
      Category: <span id="categories">${data.category}</span>
    </p>
    <p id="details-price">
      Price: <span id="price-number">${data.price}</span>$
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Bought: <span id="buys">${buyInfo.buy}</span> times.</h4>
        <span>${data.description}</span>
      </div>
    </div>


    ${hasUser?buttonTepm(isOwner,data._id,buyInfo.isBuy,onBuy):null}
  </div>
</section>`;

const buttonTepm=(isOwner,id,isBuy,onBuy)=>html`
<div id="action-buttons">
${isOwner?html`
<a href="/edit/${id}" id="edit-btn">Edit</a>
<a @click= ${onDelete.bind(id)} href="javascript:void(0)" id="delete-btn">Delete</a>`:html`
${!isBuy?html`<a @click= ${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`:null}`}

<!--Bonus - Only for logged-in users ( not authors )-->

</div>`

export async function detailsView(ctx) {
  context=ctx
  const _id = ctx.params._id;
  const [data, buyInfo] = await Promise.all([
    dataService.details(_id),
    getBuyData(_id),
  ]);
  const hasUser = Boolean(getUserData());
  const isOwner = Boolean(getOwner(data));
  ctx.render(detailsTemp(data, hasUser, buyInfo, isOwner, onBuy));

  async function onBuy() {
    await buy(_id);
    context.page.redirect(`/details/${_id}`);
  }
}
