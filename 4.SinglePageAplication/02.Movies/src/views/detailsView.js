import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner, getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete

const context = null;
const detailsTemp = (
    data,
    hasUser,
    likesInfo,
    isOwner,
    onLike
) => html` <section id="movie-example" class="view-section">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${data.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${data.img}" alt="Movie" />
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3">Movie Description</h3>
                <p>${data.description}</p>

                <!--Edit and Delete are only for creator-->

                <div id="action-buttons">
                    ${isOwner
                        ? html`<a
                                  class="btn btn-primary"
                                  id="edit"
                                  href="/edit/${data._id}"
                                  >Edit</a
                              >
                              <a
                                  class="btn btn-danger"
                                  id="delete"
                                  href="javascript:void(0)"
                                  @click=${onDelete.bind(data._id)}
                                  >Delete</a
                              >`
                        : null}
                    ${(() => {
                        if (!likesInfo.hasLiked) {
                            if (hasUser && !isOwner) {
                                return html`<a
                                    @click=${onLike}
                                    id="like"
                                    class="btn btn-primary"
                                    href="javascript:void(0)"
                                    >Like</a
                                >`;
                            }
                        }
                    })()}
                    <span class="enrolled-span">Liked ${likesInfo.likes}</span>
                </div>
            </div>
        </div>
    </div>
</section>`;
export async function detailsView(ctx, e) {
    e.preventDefault();
    const _id = this;
    const [data, likesInfo] = await Promise.all([
        dataService.details(_id),
        dataService.getLikes(_id),
    ]);
    const hasUser = Boolean(getUserData());
    const isOwner = Boolean(getOwner(data));
    console.log(`"hasUser"${hasUser}`);
    console.log(`"isOwner"${isOwner}`);
    console.log(`"likesInfo"${likesInfo.hasLiked}`);

    ctx.render(detailsTemp(data, hasUser, likesInfo, isOwner, onLike));

    async function onLike() {
        // TODO
        const id = { movieId: _id };
        await dataService.like(id);
        const likeInfo = await dataService.getLikes(_id);
        ctx.render(detailsTemp(data, hasUser, likeInfo, isOwner, onLike));
    }
}
