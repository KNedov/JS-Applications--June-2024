import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;

const registerTemp = (onLogin) => html` 
<section id="login">
    <div class="container">
        <form @submit=${onLogin} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr />

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text" />

            <p>Password</p>
            <input
                type="password"
                placeholder="Enter Password"
                name="password"
            />
            <input type="submit" class="registerbtn" value="Login" />
        </form>
        <div class="signin">
            <p>Dont have an account? <a href="/register">Sign up</a>.</p>
        </div>
    </div>
</section>`;
export function loginView(ctx) {
    context = ctx;
    ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ username, password }) {
    if (!username || !password) return alert("All field are required!");

    await userService.login(username, password);
    context.page.redirect("/dashboard");
}
