import { render } from '../../node_modules/lit-html/lit-html.js';

export function addNavigation(navRoot, navTemplate) {
    return function (ctx, next) {
        const userData = ctx.userData

        render(navTemplate(userData), navRoot);

        next();
    };
}