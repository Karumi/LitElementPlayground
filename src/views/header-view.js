import { BaseView } from './base-view';
import { html } from '@polymer/lit-element';

class HeaderView extends BaseView {
    render() {
        return html`
      <nav class="navbar is-dark is-spaced" role="navigation" aria-label="main navigation">      
            <div class="navbar-brand">            
            <a class="navbar-item" href="https://karumi.com">
                <img src="./img/logo.png" alt="Karumi" height="28">
            </a>
            <a class="navbar-item is-hidden-desktop" href="/">
                        Todos
                    </a>
                    <a class="navbar-item is-hidden-desktop" href="/stats">
                        Stats
                    </a>
            <div class="navbar-item is-hidden-desktop">
                        <a class="navbar-icon button is-small" href="https://github.com/karumi/LitElementPlayground">
                            <span class="icon is-small">
                            <i class="fab fa-github"></i>
                            </span>
                            <strong>GitHub</strong>
                        </a>
            </div>           
          </div>            
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Todos
                    </a>
                    <a class="navbar-item" href="/stats">
                        Stats
                    </a>
                </div>
                <div class="navbar-end">            
                    <div class="navbar-item">
                        <a class="navbar-icon button is-small" href="https://github.com/karumi/LitElementPlayground">
                            <span class="icon is-small">
                            <i class="fab fa-github"></i>
                            </span>
                            <strong>GitHub</strong>
                        </a>
                    </div>
                </div>
            </div>
          </div>                    
      </nav>
    `;
    }
}

customElements.define('header-view', HeaderView);
