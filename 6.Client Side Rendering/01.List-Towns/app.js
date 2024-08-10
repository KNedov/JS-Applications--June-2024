import { html, render } from "./node_modules/lit-html/lit-html.js";
const inputRef = document.getElementById("towns");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);
const root = document.getElementById("root");

function onLoad() {}
function onSubmit(e) {
  e.preventDefault();
  let towns = inputRef.value;
  inputRef.value = "";
  if (towns !== "") {
    towns = towns.split(", ");
  }

  const ul = template(towns);
  render(ul, root);
}
function template(towns) {
  return html` <ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
  </ul>`;
}
