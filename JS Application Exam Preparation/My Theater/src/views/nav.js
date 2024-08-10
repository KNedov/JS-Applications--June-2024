import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <nav>
    <a href="/dashboard">Theater</a>
    <ul>
      <!-- Logged-in users -->
      ${hasUser ? html`${userNav(hasUser)}` : html`${guestNav()}`}

      <!-- Guest users -->
    </ul>
  </nav>
`;

const guestNav = () =>
  html`
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  `;

const userNav = (user) =>
  html` <li><a href="/profile">Profile</a></li>
    <li><a href="/create">Create Event</a></li>
    <li><a href="/logout">Logout</a></li>`;
