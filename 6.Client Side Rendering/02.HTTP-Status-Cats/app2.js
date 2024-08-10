import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";
const section = document.getElementById("allCats");
render(templateCats(),section)

function templateCats(){
return html `
<ul>
  ${cats.map(cat=>createCat(cat))}
</ul>`
  
  
  
}
function createCat(cat){
  return html` <li>
        <img
          src="./images/${cat.imageLocation}.jpg"
          width="250"
          height="250"
          alt="Card image cap"
        />
        <div class="info">
          <button @click=${toggle} class="showBtn">Show status code</button>
          <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
          </div>
        </div>
      </li>`
}
const ulList = document.querySelector("ul");
update();
function update() {
  render(templateCats(), ulList);
}
function toggle(e) {
  const btn = e.target;
  const divParent = btn.parentElement;
  const div = divParent.querySelector("div");
  const currentState = div.style.display;
  const isVisible = currentState === "block";
  div.style.display = isVisible ? "none" : "block";
  div.style.display=isVisible?btn.textContent='Show status code':btn.textContent="Hide status code"
  
}
