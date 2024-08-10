import { html } from "../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
const homeTemp = () => html`<section id="hero">
<h1>
  Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
</h1>
</section>`;
const root = document.querySelector('main')
export function homeView(ctx) {
  ctx.render(homeTemp());
}
