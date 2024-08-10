import { dataService } from "../data/dataService.js";
import{html} from "../../node_modules/lit-html/lit-html.js"

const profileTemp = (data) => html` <section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${data.length > 0
            ? data.map((card) => cardTemp(card))
            : html`<p class="no-cars">You haven't listed any cars yet.</p>`}
    </div>
</section>`;
const cardTemp = (card) => html` <div class="listing">
    <div class="preview">
        <img src="${card.imageUrl}" />
    </div>
    <h2>${card.brand} ${card.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${card.year}</h3>
            <h3>Price: ${card.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${card._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;
export async function profileView(ctx){
const data= await dataService.profile()
ctx.render(profileTemp(data))
}