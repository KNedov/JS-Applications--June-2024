import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onLogin) => html`
<section id="login-page" class="login">
            <form @submit=${onLogin} id="login-form" action="" method="">
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>`;
export function loginView(ctx) {
  context = ctx;
  ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password }) {
  if (!email || !password) return alert("All field are required!");

  await userService.login(email, password);
  context.page.redirect("/dashboard");
}
