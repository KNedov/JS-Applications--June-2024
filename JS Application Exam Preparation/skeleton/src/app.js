import { page } from "./lib.js";


// TODO remove this import
// import { examView } from "../exam.js";
// // TODO remove this Api test
// import * as api from "./data/api.js";
// import { userService } from "./data/userService.js";
import { homeView } from "./homeView.js";
// window.api=api
// window.userService=userService
page("/",homeView)
page("/index.html",homeView)

page.start()