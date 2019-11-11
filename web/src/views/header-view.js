import { BaseView } from './base-view';
import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { logout } from '../redux/actions';
import { loginSelector } from '../redux/reducers';

class HeaderView extends connect(store)(BaseView) {
  static get properties() {
    return {
      username: { type: String },
      isNavActive: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.username = undefined;
  }

  stateChanged(state) {
    this.username = loginSelector(state).username;
  }

  onBurgerClick() {
    this.isNavActive = !this.isNavActive;
  }

  logOutClick() {
    store.dispatch(logout());    
    window.location.href = '/login';
  }

  getUserDropdown() {
    if (this.username) {
      return html`
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            ${this.username}
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" @click=${this.logOutClick}>
              Log out
            </a>
          </div>
        </div>
      `;
    } else {
      return html``;
    }
  }

  getBurgerMenu() {
    if(this.username) {
      return html`
        <a role="button"
              class=${'navbar-burger is-hidden-desktop ' +
                (this.isNavActive && 'is-active')}
              @click=${this.onBurgerClick}
              aria-label="menu"
              aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>          
          </div>
          <div class=${'navbar-menu is-hidden-desktop ' +
            (this.isNavActive && 'is-active')}>
            <div class="navbar-start">             
              <a class="navbar-item is-hidden-desktop" @click=${
                this.logOutClick
              }>
                  Log out
                </a>
          </div>
      `;
    } else {
      return html``;
    }
  }

  render() {
    return html`
      <nav
        class="navbar is-dark is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="https://karumi.com">
            <img src="./img/logo-vertical.png" alt="Karumi" height="28" />
          </a>
          <a class="navbar-item" href="/">
              Todos
          </a>
          <a class="navbar-item" href="/stats">
              Stats
          </a>
          <div class="navbar-item is-hidden-desktop">
            <a
                class="navbar-icon is-small"
                href="https://github.com/karumi/LitElementPlayground"
              >
                <span class="icon has-text-light is-small">
                  <i class="fab fa-github"></i>
                </span>
              </a>
            </div>

          ${this.getBurgerMenu()}
        </div>          
          <div class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <a
                  class="navbar-icon button is-small"
                  href="https://github.com/karumi/LitElementPlayground"
                >
                  <span class="icon is-small">
                    <i class="fab fa-github"></i>
                  </span>
                  <strong>GitHub</strong>
                </a>
              </div>
              ${this.getUserDropdown()}
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('header-view', HeaderView);
