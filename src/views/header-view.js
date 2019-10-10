import { BaseView } from './base-view';
import { html } from '@polymer/lit-element';
import '@polymer/app-layout/app-layout.js';

class HeaderView extends BaseView {
    render() {
        return html`
      <app-toolbar>
  <paper-icon-button icon="menu"></paper-icon-button>
  <div main-title>App name</div>
  <paper-icon-button icon="search"></paper-icon-button>
</app-toolbar>
    `;
    }
}

customElements.define('header-view', HeaderView);