import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../data/dataService.js";
import { getUserData } from "../utils.js";

const profileTemp=(data,user)=>html`
<section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${data.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) --> 
               
                ${data.length>0?data.map(card=>
                    html`
                    <div class="user-meme">
                        <p class="user-meme-title">${card.title}</p>
                        <img class="userProfileImage" alt="meme-img" src="${card.imageUrl}">
                        <a class="button" href="/details/${card._id}">Details</a>
                    </div>`
                ):html`<p class="no-memes">No memes in database.</p>`}

                <!-- Display : If user doesn't have own memes  --> 
                
            </div>
        </section>`

export async function myProfile(ctx) {
    const user= getUserData()
    const id=user._id
    const data= await dataService.profile(id)
    
    ctx.render(profileTemp(data,user))
}