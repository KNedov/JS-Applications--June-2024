import { TemplateResult } from "lit-html"

declare type SiteView = (ctx: AppContext) => void

declare type AppContext = PageJS.Context & {
    user?: {
        objectId: string,
        username: string
    },
    render(templateResult: TemplateResult): void,
    showLoader(): void,
    hideLoader(): void,
}