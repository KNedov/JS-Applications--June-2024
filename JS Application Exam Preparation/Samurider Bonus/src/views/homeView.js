import { html } from "../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
const homeTemp = () => html` <section id="home">
<h1>
  Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
<img
  src="./images/motorcycle.png"
  alt="home"
/>

</section>`;
const root = document.querySelector('main')
export function homeView(ctx) {
  ctx.render(homeTemp());
}
