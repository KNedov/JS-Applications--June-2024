import { createItem } from "../api/data.js";
import { html, nothing } from "../lib.js";

const createTemplate = (onSubmit, errorMsg, errors) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
      ${errorMsg
        ? html`<div class="form-group error">${errorMsg}</div>`
        : nothing}
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class="form-control valid ${errors.make ? " is-invalid" : ""}" id="new-make" type="text" name="make" />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control ${errors.model ? " is-invalid" : ""}" id="new-model" type="text" name="model" />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control ${errors.year ? " is-invalid" : "is-valid"}" id="new-year" type="number" name="year" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description" >Description</label>
          <input class="form-control ${errors.description ? " is-invalid" : ""}" id="new-description" type="text" name="description"/>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class="form-control ${errors.price ? " is-invalid" : ""}" id="new-price" type="number" name="price" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control ${errors.img ? " is-invalid" : ""}" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material" >Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>
`;

export function createPage(ctx) {
  update();

  function update(errorMsg, errors = {}) {
    ctx.render(createTemplate(onSubmit, errorMsg, errors));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const formData = [...new FormData(event.target).entries()];
    // const data = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }),{});
    const missing = formData.filter(([k, v]) => k != "material" && v.trim() == "");
    const errors = missing.reduce((a, [k]) => Object.assign(a, {[k] : true}),{})
    const data = new FormData(event.target)
    let {make, model, year, description, price, img, material} = Object.fromEntries(data)
    make = make.trim();
    model = model.trim();
    year = year.trim();
    description = description.trim();
    price = price.trim();
    img = img.trim();
    material = material.trim();
    console.log(missing);
    console.log(errors);

    try {
      if (missing.length > 0) {
        throw { error: new Error("Please fill all mandatory fields!"), errors };
      }

      year = Number(year);
      price = Number(price);
      
      if (make.length < 4) {
        errors.make = true;
        throw { error: new Error("Make and Model must be at least 4 symbols long"), errors };
      } 
      if (model.length < 4) {
        errors.model = true;
        throw { error: new Error("Make and Model must be at least 4 symbols long"), errors };
      } 
      if (year < 1950 || year > 2050) {
        errors.year = true;
        throw { error: new Error('Year must be between 1950 and 2050'), errors };
      } 
      if (description.length < 11) {
        errors.description = true;
        throw { error: new Error('Description must be more than 10 symbols'), errors };
      } 
      if (price < 0) {
        errors.price = true;
        throw { error: new Error('Price must be a positive number'), errors };
      } 
    //    if (img == "") {
    //     errors.img = true;
    //     throw { error: new Error('Image URL is required'), errors };
    //   }
      
     const result = await createItem({make, model, year, description, price, img, material})
     event.target.reset()
     ctx.page.redirect("/details/" + result._id);
    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors || {});
    }
  }
}