import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp=(onRegister)=>html`
  <section id="register-page" class="register">
            <form @submit=${onRegister} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`
export function registerView(ctx) {
  context=ctx
  ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password, "confirm-pass": repass }) {
    
  if (!email || !password) return alert("All field are required!");
  if (password !== repass) return alert("Password don't match!");
  await userService.register( email, password );
  context.page.redirect("/dashboard");
  
}
