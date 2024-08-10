import { contacts } from "./contacts.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const templateCard = (data) => html` <div class="contact card">
  <div>
    <i class="far fa-user-circle gravatar"></i>
  </div>
  <div class="info">
    <h2>${data.name}</h2>
    <button @click=${toggleInfo.bind(data)} class="detailsBtn">Details</button>
    ${data.details
      ? html` <div class="details" id="3">
          <p>Phone number:${data.phoneNumber}</p>
          <p>Email:${data.email}</p>
        </div>`
      : null}
  </div>
</div>`;
const container = document.getElementById("contacts");
update()
function update() {
  render(contacts.map(templateCard), container);
}
function toggleInfo() {
  this.details = !this.details;
  update();
}
