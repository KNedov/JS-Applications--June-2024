import { userService } from "../data/userService.js";
import { render } from "../lib.js";
import page from "../../../node_modules/page/page.mjs";
import {html} from "../../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../utils.js";
const loginTemp=(onLogin)=>html`
 <section id="login">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Login</h2>
            <form @submit = ${onLogin} class="login-form">
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
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>`
export function loginView() {
    render(loginTemp(createSubmitHandler(onLogin)))
}
async function onLogin({email,password}) {
    if (!email||!password)return window.alert ('All field are required!')
        await userService.login(email,password)
    page.redirect('/')
}