import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
let context=null
// TODO TEMPLATE make submitHandler and check inputs!!!
const loginTemp=(onLogin)=>html`
<section id="form-login" class="view-section">
        <form @submit=${onLogin}
          id="login-form"
          class="text-center border border-light p-5"
          action=""
          method=""
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              name="email"
              value=""
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              value=""
            />
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </section>`
export function loginView(ctx) {
  context=ctx
  ctx.render(loginTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password}) {
  if (!email || !password) return alert("All field are required!");
 
  await userService.login( email, password );
  context.page.redirect("/");
  
}
