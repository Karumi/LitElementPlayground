import './styles.css';
import './views/todo-view.js';
import './views/header-view.js';
import { Router } from '@vaadin/router';
import { store } from './redux/store.js';

window.addEventListener('load', () => {
  initRouter();
  registerServiceWorker();
});

function initRouter() {
  const router = new Router(document.querySelector('main'));
  router.setRoutes([
    {
      path: '/',
      component: 'todo-view'
    },
    {
      path: '/stats',
      component: 'stats-view',
      action: () => import(/* webpackChunkName: "stats" */ './views/stats-view') //
    },
    {
      path: '(.*)',
      component: 'not-found-view',
      action: () =>
        import(
          /* webpackChunkName: "not-found-view" */ './views/not-found-view'
        )
    }
  ]);
}

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
      console.log('Registered SW');
    } catch (e) {
      console.log('ServiceWorker registration failed. Sorry about that.', e);
    }
  } else {
    console.log('Your browser does not support ServiceWorker.');
  }
}

// expose store when run in Cypress
if (window.Cypress) {
  console.log("Set Cypress store");
  window.store = store;
}