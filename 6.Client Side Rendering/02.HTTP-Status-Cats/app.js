import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";
const section = document.getElementById("allCats");
const ul = () => html`<ul></ul>`;
render(ul(), section);
const templateCats = () =>
  Array.from(cats).map(
    (cat) =>
      html` <li>
        <img
          src="./images/${cat.imageLocation}.jpg"
          width="250"
          height="250"
          alt="Card image cap"
        />
        <div class="info">
          <button @click=${toggle.bind(cat)} class="showBtn">
            ${cat.details ? "Hide status code" : "Show status code"}
          </button>
          ${cat.details
            ? html`
                <div class="status" id="${cat.id}">
                  <h4>${cat.statusCode}</h4>
                  <p>${cat.statusMessage}</p>
                </div>
              `
            : null}
        </div>
      </li>`
  );
const ulList = document.querySelector("ul");
update();
function update() {
  render(templateCats(), ulList);
}
function toggle() {
  this.details = !this.details;
  update();
}
