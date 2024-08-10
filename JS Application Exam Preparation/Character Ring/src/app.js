import page from "../node_modules/page/page.mjs"
import { createView } from "./views/createView.js"
import { dashboardView } from "./views/dashboardView.js"
import { detailsView } from "./views/detailsView.js"
import { homeView } from "./views/homeView.js"
import { loginView } from "./views/loginView.js"
import { logout } from "./views/logoutDel.js"
import { registerView } from "./views/registerView.js"
import { updateView } from "./views/updateView.js"



page('/',homeView)
page('/index.html',homeView)
page('/login',loginView)
page('/register',registerView)
page('/logout',logout)
page('/dashboard',dashboardView)
page('/details/:_id',detailsView)
page('/edit/:_id',updateView)
page('/create',createView)
page.start()
page.redirect('/')
