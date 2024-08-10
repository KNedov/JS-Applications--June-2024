import { render as baseRender } from '@lit/lit-html.js';

/**
 * @param {HTMLElement} root 
 */
export function addRender(root) {
    return function (ctx, next) {
        ctx.render = render;

        next();
    };

    function render(templateResult) {
        baseRender(templateResult, root);
    }
}