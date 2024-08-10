import { loadPosts } from "./homePage.js";

const homeNavigationRef = document.querySelector("nav a");

homeNavigationRef.addEventListener("click", loadPosts);
loadPosts();
