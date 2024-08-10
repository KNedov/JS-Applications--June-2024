import { render } from '@lit/lit-html.js';
import { loader } from '../views/common/loader.js';

export function addLoader() {
    return function(ctx, next) {
        ctx.showLoader = showLoader;
        ctx.hideLoader = hideLoader;

        next();
    };

    function showLoader() {
        render(loader(true), document.body);
    }

    function hideLoader() {
        render(loader(false), document.body);
    }
}