import { BaseView } from "./base-view.js";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { statsSelector } from "../redux/reducer.js";
import '@vaadin/vaadin-charts';
import {html} from '@polymer/lit-element';

class StatsView extends connect(store)(BaseView){
    static get properties() {
        return {
            chartConfig: { type: Object },
            hasTodos: { type: Int16Array }
        }
    }

    stateChanged(state) {
        const stats = statsSelector(state);
        this.chartConfig = [
            { name: 'Completed', y: stats.completed},
            { name: 'Active', y: stats.active}
        ];

        this.hasTodos = state.todos.length > 0;
    }

    render() {
        return html`
            <style>
                stats-view {
                    display: block;
                }
            </style>

            ${this.getChart()}
        `;
    }

    getChart() {
        if(this.hasTodos) {
            return html`
                <vaadin-chart type="pie">
                    <vaadin-chart-series
                        .values="${this.chartConfig}">
                    </vaadin-chart-series>
                </vaadin-chart>
            `;
        } else {
            return html`
                <p>Nothing to do</p>
            `;
        }
    }
}

customElements.define('stats-view', StatsView);