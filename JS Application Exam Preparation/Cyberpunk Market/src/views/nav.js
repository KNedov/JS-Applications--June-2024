import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <a id="logo" href="/"><img id="logo" src="./images/logo.png" alt="img" /></a>
  <nav>
    <div>
      <a href="/dashboard">Market</a>
    </div>
    <!-- Logged-in users -->
    ${hasUser ? html`${userNav()}` : html`${guestNav()}`}
    <!-- Guest users -->
  </nav>
`;

const userNav = () =>
  html`
  <div class="user">
    <a href="/create">Sell</a>
    <a href="/logout">Logout</a>
  </div>`;

const guestNav = () =>
    html`
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    `;
