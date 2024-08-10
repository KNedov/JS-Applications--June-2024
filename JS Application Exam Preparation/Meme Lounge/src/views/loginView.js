import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
import { notify } from "./notifyView.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onLogin) => html` <section id="login">
  <form @submit=${onLogin} id="login-form">
    <div class="container">
      <h1>Login</h1>
      <label for="email">Email</label>
      <input id="email" placeholder="Enter Email" name="email" type="text" />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
      <input type="submit" class="registerbtn button" value="Login" />
      <div class="container signin">
        <p>Dont have an account?<a href="#">Sign up</a>.</p>
      </div>
    </div>
  </form>
</section>`;
export function loginView(ctx) {
  context = ctx;
  ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password }) {
  if (!email || !password) return notify("All field are required!");

  await userService.login(email, password);
  context.page.redirect("/dashboard");
}
