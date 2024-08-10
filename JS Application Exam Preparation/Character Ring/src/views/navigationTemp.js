
import {html} from "../../../node_modules/lit-html/lit-html.js";

export const navigationTemp = (template,hasUser) => html`
  <!-- Navigation -->
 
  <header>
  <a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="" /></a>
  <nav>
    <div>
      <a href="/dashboard">Characters</a>
    </div>
    <!-- Logged-in users -->
    ${hasUser ? userTemp() : guestTemp()}
    <!-- Guest users -->
  </nav> 
  </header>
  <main>
     <!-- TODO -->
    ${template}
  </main>
`;
export const guestTemp = () => html` <div class="guest">
  <a href="/login">Login</a>
  <a href="/register">Register</a>
</div>`;

export const userTemp = () => html` <div class="user">
  <a href="/create">Add Character</a>
  <a href="/logout">Logout</a>
</div>`;



