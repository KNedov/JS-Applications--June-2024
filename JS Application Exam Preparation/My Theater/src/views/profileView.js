import { getUserData } from "../utils.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../data/dataService.js";
// TODO TEMPLATE
const profileTemp = (data,user) => html`
  <section id="profilePage">
    <div class="userInfo">
      <div class="avatar">
        <img src="./images/profilePic.png" />
      </div>
      <h2>${user.email}</h2>
    </div>
    <div class="board">
      ${data.length > 0
        ? data.map(
            (p) => html` <div class="eventBoard">
              <div class="event-info">
                <img src="${p.imageUrl}" />
                <h2>${p.title}</h2>
                <h6>${p.date}</h6>
                <a href="/details/${p._id}" class="details-button">Details</a>
              </div>
            </div>`
          )
        : html`<div class="no-events">
            <p>This user has no events yet!</p>
          </div>`}
    </div>
  </section>
`;

export async function profileView(ctx) {
  const user=getUserData()
  const data = await dataService.profile();
  ctx.render(profileTemp(data,user));
}
