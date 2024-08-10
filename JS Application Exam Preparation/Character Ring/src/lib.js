import {render as renderBase} from "../node_modules/lit-html/lit-html.js";
import { navigationTemp } from "./views/navigationTemp.js";
import { getUserData,getOwner } from "./utils.js";
// TODO replace with project root element

const root=document.querySelector('#wrapper')
const headerNav=document.querySelector('header')
const isOwner=getOwner()
function render(templateResult) {
    const hasUser=getUserData()
    renderBase(navigationTemp(templateResult,hasUser,isOwner),root)
}

export {render
}


