import { userService } from "../data/userService.js";
import {render } from "../lib.js";
import { createSubmitHandler } from "../utils.js";
import page from "../../../node_modules/page/page.mjs";
import {html} from "../../../node_modules/lit-html/lit-html.js";


const registerTemp=(onRegister)=>html`
  <section id="register">
          
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Register</h2>
            <form @submit = ${onRegister} class="register-form">
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
            <img class="border" src="/images/border.png" alt="">
          </div>
         
        </section>`
export function registerView() {
  render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ email, password, "re-password": repass }) {
    
  if (!email || !password) return alert("All field are required!");
  if (password !== repass) return alert("Password don't match!");
  await userService.register( email, password );
  render(registerTemp)
  page.redirect("/");
  
}
