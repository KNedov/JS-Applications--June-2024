import page from "./node_modules/page/page.mjs";
import { render } from "./node_modules/lit-html/lit-html.js";
import { userService } from "./src/service/userService.js";
import { showHomeView } from "./src/views/homeView.js";
import { showDashboardView } from "./src/views/dashboardView.js";
import { showRegisterView } from "./src/views/registerView.js";
import { showLoginView } from "./src/views/loginView.js";
import { showDetailView } from "./src/views/detailsView.js";
import { showEditView } from "./src/views/editView.js";
import { showSearchView } from "./src/views/searchView.js";
import { showCreateView } from "./src/views/createView.js";
import { navTemplate } from "./src/views/navTemp.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { userHelper } from "./src/service/userHelper.js";

const root = document.querySelector("main"); /*ADD ROOT ELEMENT*/
const header = document.querySelector("header");

page(decorationContext)
page(authMiddleware);
page("/", showHomeView);
page("/home", showHomeView);
page("/index.html", showHomeView);
page("/dashboard", showDashboardView);
page("/register", showRegisterView);
page("/login", showLoginView);
page("/details/:_id", showDetailView);
page("/edit/:_id", showEditView);
page("/search", showSearchView);
page("/create", showCreateView);
page("/logout", logout);

page.start();
updateNav();
async function logout() {
  await userService.Logout();
  updateNav();
  goTo("/");
}

function renderer(template) {
  render(template, root);
}

function goTo(path) {
  page.redirect(path);
}

function decorationContext(ctx, next) {
  ctx.render = renderer;
  ctx.updateNav = updateNav;
  ctx.goTo = goTo;

  next();
}

function updateNav() {
  const isAuthenticated = userHelper.getUserData();
  render(navTemplate(isAuthenticated), header);
}
