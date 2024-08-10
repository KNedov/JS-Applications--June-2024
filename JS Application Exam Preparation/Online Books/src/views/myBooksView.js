import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../data/dataService.js";
// TODO TEMPLATE
const myBooksTemp = (data) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            ${data.length>0?html`
              <ul class="my-books-list">
              ${data.map(p=>html`
              <li class="otherBooks">
                    <h3>${p.title}</h3>
                    <p>Type: ${p.type}</p>
                    <p class="img"><img src="${p.imageUrl}"></p>
                    <a class="button" href="details/${p._id}">Details</a>
                </li>`)}
            </ul>`:html`<p class="no-books">No books in database!</p>`}
            `;

export async function myBooksView(ctx) {
  const data= await dataService.profile()
  ctx.render(myBooksTemp(data));
}
