import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp=(onLogin)=>html`
 <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit =${onLogin} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>`
export function loginView(ctx) {
  context=ctx
  ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password}) {
  if (!email || !password) return alert("All field are required!");
 
  await userService.login( email, password );
  context.page.redirect("/");
  
}
