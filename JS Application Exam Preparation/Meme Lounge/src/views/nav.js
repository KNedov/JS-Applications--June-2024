import { html } from "../../node_modules/lit-html/lit-html.js";

export const navTemplate = (hasUser) => html`
  <!-- Navigation -->
  <a href="/dashboard">All Memes</a>
    
    <!-- Logged-in users -->
    ${hasUser ? html`${userNav(hasUser)}` : html`${guestNav()}`}
    <!-- Guest users -->
  </nav>
`;

const userNav = (user) =>
  html` <div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
      <span>Welcome, ${user.email}</span>
      <a href="/myProfile">My Profile</a>
      <a href="/logout">Logout</a>
    </div>
  </div>`;

const guestNav = () =>
  html`
     <div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
            </div>
  `;
