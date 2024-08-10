import { html } from "../../node_modules/lit-html/lit-html.js";
import { auth } from "../service/auth.js";

const registerTemplate=()=> html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`
let context=null
export function showRegisterView(ctx) {
    context=ctx
ctx.render(registerTemplate())
}
async function onSubmit(e) {
    const data= await auth.handleRegister(e)
   if (data) {
    context.goTo('/home')
    context.updateNav()
   }
    
}