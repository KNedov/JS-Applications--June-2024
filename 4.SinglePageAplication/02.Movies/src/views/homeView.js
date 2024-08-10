import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../data/dataService.js";
import { getUserData } from "../utils.js";
import { detailsView } from "./detailsView.js";
const homeTemp = (user,data,ctx) => html`
   <section id="home-page" class="view-section">
        <div
          class="jumbotron jumbotron-fluid text-light"
          style="background-color: #343a40"
        >
          <img
            src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
            class="img-fluid"
            alt="Responsive image"
            style="width: 150%; height: 200px"
          />
          <h1 class="display-4">Movies</h1>
          <p class="lead">
            Unlimited movies, TV shows, and more. Watch anywhere. Cancel
            anytime.
          </p>
        </div>

        <h1 class="text-center">Movies</h1>

        ${user
        ?html`
            <section id="add-movie-button" class="user">
                <a href="/create" class="btn btn-warning">Add Movie</a>
            </section>`
        :null}

        <section id="movie">
          <div class="mt-3">
            <div class="row d-flex d-wrap">
              <ul id="movies-list" class="card-deck d-flex justify-content-center">
                <!-- list item example -->
                ${data?data.map(c=>cardTemp(c,ctx)):null}
              </ul>
            </div>
          </div>
        </section>
      </section>`;
const cardTemp = (card,ctx) => html` 
   <li class="card mb-4">
                  <img class="card-img-top"  src="${card.img}" alt="Card image cap" width="400"/>
                  <div class="card-body">
                    <h4 class="card-title">${card.title}</h4>
                    <a href="#">
                    </a>
                  </div>
                  <div class="card-footer">
                  <button type="button" @click=${detailsView.bind(card._id,ctx)} class="btn btn-info">Details</button>
                  </div>
                </li>
`;
const root = document.querySelector("main");
export async function homeView(ctx) {
    const user=getUserData()
    const data=await dataService.getAll()
    ctx.render(homeTemp(user,data,ctx));
}
