import { render } from '@lit/lit-html.js';

/**
 * @param {HTMLElement} navRoot 
 * @param {(hasUser: boolean) => import('@lit/lit-html.js').TemplateResult} navTemplate
 */
export function addNavigation(navRoot, navTemplate) {
    return function (ctx, next) {
        const username = ctx.user?.username;

        render(navTemplate(username), navRoot);

        next();
    };
}