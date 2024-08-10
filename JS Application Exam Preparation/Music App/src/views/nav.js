import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <nav>
    <img src="./images/headphones.png" />
    <a href="/home">Home</a>
    <ul>
      <!--All user-->
      <li><a href="/dashboard">Catalog</a></li>
      <li><a href="/search">Search</a></li>

      <!-- Logged-in users -->
      ${hasUser ? html`${userNav()}` : html`${guestNav()}`}
    </ul>
  </nav>
`;

const guestNav = () =>
  html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  `;

const userNav = () =>
  html`
    <li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>
  `;
