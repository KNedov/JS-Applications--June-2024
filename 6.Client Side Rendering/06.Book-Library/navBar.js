import { html, render } from "../../node_modules/lit-html/lit-html.js";

const header = document.querySelector("header");

const navTemp = (isAuthenticated) =>{ 
    return html`
    /*TODO*/
    <!-- Navigation -->
    
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
  
    <nav>
      <div>
        <a href="/products">Products</a>
      </div>
      ${isAuthenticated ? loggedInUserTemp(): guestUserTemplate()}
      
    </nav>`};
  

const loggedInUserTemp = () =>{
    return html` <!-- Logged-in users -->
 `};

const guestUserTemplate = () =>{ 
    return html` <!-- Guest users -->
  `}


export function navBarView(ctx,next) {
  const isAuthenticated = ctx.authData
  render(navTemp(isAuthenticated), header);

  next();
}