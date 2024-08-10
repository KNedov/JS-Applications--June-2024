import { userService } from "../data/userService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
let context = null;
// TODO TEMPLATE make submitHandler and check inputs!!!
const registerTemp = (onLogin) => html` <section id="loginPage">
    <form @submit=${onLogin}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input
                id="email"
                class="email"
                name="email"
                type="text"
                placeholder="Email"
            />

            <label for="password" class="vhide">Password</label>
            <input
                id="password"
                class="password"
                name="password"
                type="password"
                placeholder="Password"
            />

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span
                    >If you don't have profile click <a href="/register">here</a></span
                >
            </p>
        </fieldset>
    </form>
</section>`;
export function loginView(ctx) {
    context = ctx;
    ctx.render(registerTemp(createSubmitHandler(onLogin)));
}
async function onLogin({ email, password }) {
    if (!email || !password) return alert("All field are required!");

    await userService.login(email, password);
    context.page.redirect("/");
}
