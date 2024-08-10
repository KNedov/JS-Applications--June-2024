import { html } from "../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
const homeTemp = () => html`<section id="hero">
<img src="/images/home.png" alt="home" />
<p>We know who you are, we will contact you</p>
</section>`;
const root = document.querySelector('main')
export function homeView(ctx) {
  ctx.render(homeTemp());
}
