import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../data/dataService.js";
// TODO TEMPLATE
const homeTemp = (data) => html`
 <section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="/images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
    ${data.length>0?data.map(card=>cardTemp(card)):html`<p class="no-articles">No games yet</p>`}
</div>
</section>`;
const cardTemp=(data)=>html`
 <div class="game">
    <div class="image-wrap">
        <img src="${data.imageUrl}">
    </div>
    <h3>${data.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${data._id}" class="btn details-btn">Details</a>
    </div>
</div>`

export async function homeView(ctx) {
  const data= await dataService.getCatalog()
  ctx.render(homeTemp(data));
}
