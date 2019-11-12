import { BaseView } from './base-view';
import { html } from '@polymer/lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import '@vaadin/vaadin-button';
import { loginUser } from '../redux/actions';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { loginSelector } from '../redux/reducers';
import { Router } from '@vaadin/router';

class LoginView extends connect(store)(BaseView) {
  static get properties() {
    return {
      username: { type: String },
      password: { type: String },
      loginError: { type: Boolean },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.loginError = false;
  }

  isEmpty(text) {
    return (text && text === '') || text.trim() === '';
  }

  userChange(event) {
    this.username = event.target.value;
  }

  passwordChange(event) {
    this.password = event.target.value;
  }

  login() {
    if (!this.isEmpty(this.username) && !this.isEmpty(this.password)) {
      this.setError(false);
      store.dispatch(loginUser(this.username, this.password));
    } else {
      this.setError(true);
    }
  }

  setError(error) {
    this.loginError = error;
  }

  stateChanged(state) {
    const login = loginSelector(state);
    this.loginError = login.error;
    this.loading = login.loading;
    this.redirectHome(login);
  }

  redirectHome(login) {
    if (login.username && !login.error && !login.loading) {      
      window.location.href = '/';
      //Router.go("/")
    }
  }

  shortcutListener(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  render() {
    return html`
      <section class="section">
        <div style="max-width: 300px;" class="section container box">
          <div class="section is-flex is-horizontal-center">
            <figure class="image is-64x64">
              <img src="./img/logo-horizontal.png" alt="Karumi" />
            </figure>
          </div>
          <section
            style="margin-top: 28px; margin-right: 10px; margin-left: 10px;"
            class="content"
          >
            <div class="field">
              <div class="control">
                <input
                  value="${this.username}"
                  class="input"
                  required="required"                  
                  @change="${this.userChange}"
                  type="text"
                  placeholder="username"
                />
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-right">
                <input
                  value="${this.password}"
                  @keyup="${this.shortcutListener}"
                  class="${'input ' + (this.loginError && 'is-danger')}"
                  required="required"
                  type="password"
                  @change="${this.passwordChange}"
                  placeholder="Password"
                />
              </div>

              <p
                style=${styleMap({
                  visibility: this.loginError ? 'visible' : 'hidden'
                })}
                class="help is-danger"
              >
                Incorrect username or password.
              </p>
            </div>
            <vaadin-button
              theme="button is-fullwidth primary"
              @click="${this.login}"
            >
              Login
            </vaadin-button>
          </section>
        </div>
      </section>
    `;
  }
}

customElements.define('login-view', LoginView);
