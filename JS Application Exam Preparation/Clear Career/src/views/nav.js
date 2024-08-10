import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <a id="logo" href="/"
          ><img id="logo-img" src="/images/logo.jpg" alt=""
        /></a>
  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
    </div>

    <!-- Logged-in users -->
    ${hasUser ? html`${userNav()}` : html`${guestNav()}`}

    <!-- Guest users -->
  </nav>
`;

const guestNav = () =>
  html`
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  `;

const userNav = () =>
  html` <div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
  </div>`;
