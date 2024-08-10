import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp=(onRegister)=>html`
  <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${onRegister} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`
export function registerView(ctx) {
  context=ctx
  ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password, "re-password": repass }) {
    
  if (!email || !password) return alert("All field are required!");
  if (password !== repass) return alert("Password don't match!");
  await userService.register( email, password );
  context.page.redirect("/");
  
}
