import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->

  <nav>
  <img src="/images/logo.png" alt="logo" />
    <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${hasUser ? html`${userNav()}` : html`${guestNav()}`}
</ul>

  </nav>
`;

const guestNav = () =>
  html`
    <div class="guest">
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </div>
  `;

const userNav = () =>
  html`
    
      <li><a href="/create">Create Postcard</a></li>
      <li><a href="/logout">Logout</a></li>
  
  `;
