import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onRegister) => html` 
<section id="register">
    <div class="container">
        <form @submit =${onRegister} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />

            <p>Username</p>
            <input
                type="text"
                placeholder="Enter Username"
                name="username"
                required
            />

            <p>Password</p>
            <input
                type="password"
                placeholder="Enter Password"
                name="password"
                required
            />

            <p>Repeat Password</p>
            <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPass"
                required
            />
            <hr />

            <input type="submit" class="registerbtn" value="Register" />
        </form>
        <div class="signin">
            <p>Already have an account? <a href="/login">Sign in</a>.</p>
        </div>
    </div>
</section>`;
export function registerView(ctx) {
    context = ctx;
    ctx.render(registerTemp(createSubmitHandler(onRegister)));
}
async function onRegister({ username, password, repeatPass }) {
    if (!username || !password) return alert("All field are required!");
    if (password !== repeatPass) return alert("Password don't match!");
    await userService.register(username, password);
    context.page.redirect("/");
}
