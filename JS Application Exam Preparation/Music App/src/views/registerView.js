import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onRegister) => html`
<section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;
export function registerView(ctx) {
  context = ctx;
  ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password, "conf-pass": repass }) {
  if (!email || !password) return alert("All field are required!");
  if (password !== repass) return alert("Password don't match!");
  await userService.register(email, password);
  context.page.redirect("/");
}
