import { BaseView } from "./base-view";
import {html} from '@polymer/lit-element';

class NotFoundView extends BaseView {
    render() {
        return html`
            <h1>Not found!</h1>
        `;
    }
}

customElements.define('not-found-view', NotFoundView);