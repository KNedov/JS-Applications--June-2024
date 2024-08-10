import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null

const registerTemp=(onRegister)=>html`
  <section id="register-page" class="content auth">
            <form @submit=${onRegister} id="register">
                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Register</h1>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">

                    <label for="pass">Password:</label>
                    <input type="password" name="password" id="register-password">

                    <label for="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password">

                    <input class="btn submit" type="submit" value="Register">

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </div>
            </form>
        </section>`
export function registerView(ctx) {
  context=ctx
  ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password, "confirm-password": repass }) {
    
  if (!email || !password) return alert("All field are required!");
  if (password !== repass) return alert("Password don't match!");
  await userService.register( email, password );
  context.page.redirect("/");
  
}
