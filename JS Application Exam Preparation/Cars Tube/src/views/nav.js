import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
    <!-- Navigation -->
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/dashboard">All Listings</a>
        <a href="/search">By Year</a>

        <!-- Logged-in users -->
        ${hasUser ? html`${userNav(hasUser)}` : html`${guestNav()}`}
    </nav>
`;

const guestNav = () =>
    html`
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;

const userNav = (user) =>
    html`
        <div id="profile">
            <a>Welcome ${user.username}</a>
            <a href="/profile">My Listings</a>
            <a href="/create">Create Listing</a>
            <a href="/logout">Logout</a>
        </div>
    `;
