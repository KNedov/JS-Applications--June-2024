import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onLogin) => html`
<section id="login-page" class="auth">
            <form @submit=${onLogin} id="login">

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;
export function loginView(ctx) {
  context = ctx;
  ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password }) {
  if (!email || !password) return alert("All field are required!");

  await userService.login(email, password);
  context.page.redirect("/");
}
