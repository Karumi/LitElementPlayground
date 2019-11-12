import { BaseView } from './base-view.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { statsSelector, getTodosSelector } from '../redux/reducers';
import { html } from '@polymer/lit-element';
import Chart from 'chart.js';

class StatsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      chartConfig: { type: Object },
      hasTodos: { type: Number }
    };
  }

  stateChanged(state) {
    const stats = statsSelector(state);
    this.chartConfig = {
      datasets: [
        {
          data: [stats.completed, stats.active],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255,99,132,1)'],
          borderWidth: 2,
          borderAlign: 'center'
        }
      ],
      labels: ['Completed', 'Active']
    };

    this.hasTodos = getTodosSelector(state).length > 0;
  }

  render() {
    return html`
      <style>
        stats-view {
          display: block;
        }
      </style>
      <section class="section">
        ${this.getChart()}
      </section>
    `;
  }

  firstUpdated() {
    if (this.hasTodos) {
      const ctx = this.renderRoot.querySelector('#pie-chart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: this.chartConfig
      });
    }
  }

  getChart() {
    if (this.hasTodos) {
      return html`
        <div>
          <canvas id="pie-chart"></canvas>
        </div>
      `;
    } else {
      return html`
        <p>Nothing to do</p>
      `;
    }
  }
}

customElements.define('stats-view', StatsView);
