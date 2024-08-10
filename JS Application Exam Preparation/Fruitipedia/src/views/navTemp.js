 import { html } from "../../node_modules/lit-html/lit-html.js";
 export const navTemplate = (isAuthenticated) => {
    return html` <a id="logo" href="/"
        ><img id="logo-img" src="./images/logo.png" alt=""
      /></a>
  
      <nav>
        <div>
          <a href="/dashboard">Fruits</a>
          <a href="/search">Search</a>
        </div>
  
        <!-- Logged-in users -->
        ${isAuthenticated ? userTemp() : guestTemp()}
      </nav>
      `;
  };
  
  const userTemp = () => {
    return html`
      <!-- Logged-in users -->
      <div class="user">
        <a href="/create">Add Fruit</a>
        <a href="/logout">Logout</a>
      </div>
    `;
  };
  
  const guestTemp = () => {
    return html` <!-- Guest users -->
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`;
  };
 