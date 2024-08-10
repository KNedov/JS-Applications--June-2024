import { render as baseRender } from '../../node_modules/lit-html/lit-html.js';


export function addRender(root) {
    return function (ctx, next) {
        ctx.render = render;

        next();
    };

    function render(templateResult) {
        baseRender(templateResult, root);
    }
}