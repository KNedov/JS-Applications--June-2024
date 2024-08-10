import { html,render } from "./src/lib.js";
import { createSubmitHandler } from "./src/util.js";

const examleTemplate=(submitHandler)=>html`
<h2>Hello, exam!
    <form @submit=${submitHandler}>
        <input name="myData">
        <input type="submit" value="Submit">
    </form>
</h2>`

export function examView(ctx) {
    render(examleTemplate(createSubmitHandler(onSubmit)))
}
function onSubmit(data,form) {
    console.log(data);
    form.reset()
}