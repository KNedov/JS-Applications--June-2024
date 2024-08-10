import page from "../node_modules/page/page.mjs"
import { addSession } from "./middlewares/session.js";
import { addNavigation } from "./middlewares/navigation.js";
import { addRender } from "./middlewares/render.js";

import { createView } from "./views/createView.js";
import { dashboardView } from "./views/dashboardView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/EditView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { logoutAction } from "./views/logout.js";
import { registerView } from "./views/registerView.js";
import { navTemplate } from "./views/nav.js";
import { searchView } from "./views/search.js";

// TODO update ROOT and NAV
const root = document.querySelector('main')
const nav = document.querySelector('header');

if (!root) {
    throw new ReferenceError('Document has no valid root!');
}
if (!nav) {
    throw new ReferenceError('Document has no valid navigation!');
}
page(addSession());
page(addNavigation(nav, navTemplate));
page(addRender(root));



page('/',homeView)
page('/index.html',homeView)
page('/login',loginView)
page('/register',registerView)
page('/logout',logoutAction)
page('/dashboard',dashboardView)
page('/create',createView)
page('/details/:_id',detailsView)
page('/edit/:_id',editView)
page('/search',searchView)
page.start()
