import { getById, editItem } from "../api/data.js";
import { html, until, nothing } from "../lib.js";


const editTemplate = (itemPromise) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
            ${until(itemPromise, html`<p>Loading &hellip;</p>`)}   
`;

const formTemplate = (item, onSubmit, errorMsg, errors) => html `
        ${errorMsg
        ? html`<div class="col-md-12 form-group error"><p>${errorMsg}</p></div>`
        : nothing}
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${errors.make ? " is-invalid" : ""}" id="new-make" type="text" name="make" .value=${item.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${errors.model ? " is-invalid" : ""}" id="new-model" type="text" name="model" .value=${item.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${errors.year ? " is-invalid" : ""}" id="new-year" type="number" name="year" .value=${item.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${errors.description ? " is-invalid" : ""}" id="new-description" type="text" name="description" .value=${item.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${errors.price ? " is-invalid" : ""}" id="new-price" type="number" name="price" .value=${item.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${errors.img ? " is-invalid" : ""}" id="new-image" type="text" name="img" .value=${item.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`

export function editPage(ctx) {
  const itemPromise = getById(ctx.params.id)

  update(itemPromise, null, {})

  function update(itemPromise, errorMsg, errors) {
    ctx.render(editTemplate(loadItem(itemPromise,errorMsg, errors)))
  }

  async function loadItem(itemPromise,errorMsg, errors) {
    const item = await itemPromise
    return formTemplate(item, onSubmit, errorMsg, errors)
  }

  async function onSubmit(event) {
    event.preventDefault();
    const formData = [...new FormData(event.target).entries()];
    const objData = formData.reduce((a, [k, v]) => Object.assign(a, { [k]: v }),{});
    
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
      
     const result = await editItem(ctx.params.id, {make, model, year, description, price, img, material})
     event.target.reset()
     ctx.page.redirect("/details/" + result._id);
    } catch (err) {
      const message = err.message || err.error.message;
      update(objData, message, err.errors || {});
    }
  }
}