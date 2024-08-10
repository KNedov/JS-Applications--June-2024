import { logout } from "./api/users.js";
import { clearUserData, getUserData } from "./util.js";

import { render, page } from "./lib.js";

import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector(".container");

const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", onLogout);

const nav = document.querySelector("#my-navigation");
nav.addEventListener("click", addRemoveClass)

page(decorateContext);

page("/index.html", "/");
page("/", catalogPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/login", loginPage);
page("/register", registerPage);
page("/my-furniture", catalogPage);
page("*", notFound);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.updateUserNav = updateUserNav;
  next();
}

function notFound(ctx) {
  ctx.render("404 Not found! Please wait...");
  setTimeout(() => ctx.page.redirect("/"), 2000);
}

function updateUserNav() {
  const user = getUserData();
  if (user != null) {
    document.querySelector("#user").style.display = "inline-block";
    document.querySelector("#guest").style.display = "none";
  } else {
    document.querySelector("#guest").style.display = "inline-block";
    document.querySelector("#user").style.display = "none";
  }
}

function addRemoveClass(event) {
  if (event.target.tagName == "A") {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
  }
}

async function onLogout() {
  await logout();
  clearUserData();
  page.redirect('/')
  updateUserNav();
}