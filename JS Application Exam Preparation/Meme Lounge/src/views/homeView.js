import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utils.js";
// TODO TEMPLATE
const homeTemp = () => html` <section id="welcome">
  <div id="welcome-container">
    <h1>Welcome To Meme Lounge</h1>
    <img src="/images/welcome-meme.jpg" alt="meme" />
    <h2>Login to see our memes right away!</h2>
    <div id="button-div">
      <a href="/login" class="button">Login</a>
      <a href="/register" class="button">Register</a>
    </div>
  </div>
</section>`;
const root = document.querySelector("main");
export function homeView(ctx) {
  const user = getUserData();
  if (user) {
    ctx.page.redirect("/dashboard");
  } else {
    ctx.render(homeTemp());
  }
}
