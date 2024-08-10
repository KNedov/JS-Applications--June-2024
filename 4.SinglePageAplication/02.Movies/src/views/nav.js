import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
    <!-- Navigation -->
    <a class="navbar-brand text-light" href="/">Movies</a>
    <ul class="navbar-nav ml-auto">
        <!-- Logged-in users -->
        ${hasUser ? html`${userNav(hasUser)}` : html`${guestNav()}`}

        <!-- Guest users -->
    </ul>
`;

const guestNav = () => html`
    <li class="nav-item guest">
        <a class="nav-link" href="/login">Login</a>
    </li>
    <li class="nav-item guest">
        <a class="nav-link" href="/register">Register</a>
    </li>
`;

const userNav = (userData) => html` <li class="nav-item user">
        <a class="nav-link" id="welcome-msg">Welcome, ${userData.email}</a>
    </li>
    <li class="nav-item user">
        <a class="nav-link" href="/logout">Logout</a>
    </li>`;
