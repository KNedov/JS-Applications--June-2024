import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <h1><a class="home" href="/">GamesPlay</a></h1>
  <nav>
  <a href="/dashboard">All games</a>

    <!-- Logged-in users -->
    ${hasUser ? html`${userNav()}` : html`${guestNav()}`}

    <!-- Guest users -->
  </nav>
`;

const guestNav = () =>
  html`
    <div id="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  `;

const userNav = () =>
  html` <div id="user">
    <a href="/create">Create Game</a>
    <a href="/logout">Logout</a>
  </div>`;
