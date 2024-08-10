import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

let context = null;
const createTemp = (onCreate) => html` 
<section id="create-listing">
    <div class="container">
        <form @submit=${onCreate} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr />

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" />

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" />

            <p>Description</p>
            <input
                type="text"
                placeholder="Enter Description"
                name="description"
            />

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" />

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" />

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" />

            <hr />
            <input type="submit" class="registerbtn" value="Create Listing" />
        </form>
    </div>
</section>`;
export function createView(ctx) {
    context = ctx;
    ctx.render(createTemp(createSubmitHandler(onCreate)));
}
async function onCreate({
    brand,
    model,
    description,
    year,
    imageUrl,
    price
  }
  
  )
  
  
  {
    
    console.log(brand,model,description,year,imageUrl,price);
    debugger
    if (
        !brand ||
        !model ||
        !description ||
        !year ||
        !imageUrl ||
        !price
    )
        return window.alert("All fields are required");
    price=Number(price)
    year=Number(year)
    await dataService.create({
        brand,
        model,
        description,
        year,
        imageUrl,
        price
      }
      );
    context.page.redirect("/dashboard");
}
