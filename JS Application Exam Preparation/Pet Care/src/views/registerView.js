import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp=(onRegister)=>html`
 <section id="registerPage">
            <form @submit=${onRegister} class="registerForm">
                <img src="/images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>`
export function registerView(ctx) {
  context=ctx
  ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password,repeatPassword }) {
    
  if (!email || !password) return alert("All field are required!");
  if (password !== repeatPassword) return alert("Password don't match!");
  await userService.register( email, password );
  context.page.redirect("/");
  
}
