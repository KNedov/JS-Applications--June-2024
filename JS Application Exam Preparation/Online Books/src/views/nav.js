import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <nav class="navbar">
    <section class="navbar-dashboard">
      <a href="/dashboard">Dashboard</a>

      <!-- Logged-in users -->
      ${hasUser ? html`${userNav(hasUser)}` : html`${guestNav()}`}

      <!-- Guest users -->
    </section>
  </nav>
`;

const guestNav = () =>
  html`
    <div id="guest">
      <a class="button" href="/login">Login</a>
      <a class="button" href="/register">Register</a>
    </div>
  `;

const userNav = (user) =>
  html` <div id="user">
    <span>Welcome, ${user.email}</span>
    <a class="button" href="/myBooks">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a class="button" href="/logout">Logout</a>
  </div>`;
