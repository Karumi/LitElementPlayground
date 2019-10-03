import {LitElement, html} from '@polymer/lit-element'
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
};

class TodoView extends LitElement {

    static get properties() {
        return {
            todos: { type: Array},
            filter: { type: String },
            task: { type: String }
        }
    }

    constructor () {
        super();
        this.todos = [];
        this.filter = VisibilityFilters.SHOW_ALL;
        this.task = '';
    }

    render() {
        
        return html`
            <style>
                todo-view { 
                    display: block;
                    max-width: 800px;
                    margin: 0 auto;
                }
                todo-view .input-layout {
                    width: 100%;
                    display: flex;
                }
                todo-view .input-layout vaadin-text-field {
                    flex: 1;
                    margin-right: var(--spacing); 
                }
                todo-view .todos-list {
                    margin-top: var(--spacing);
                }
                todo-view .visibility-filters {
                    margin-top: calc(4 * var(--spacing));
                }
            </style>
            <div class="input-layout" 
                 @keyup="${this.shortcutListener}">

                <vaadin-text-field 
                    placeholder="Task" 
                    value="${this.task}"
                    @change="${this.updateTask}">
                </vaadin-text-field>
                <vaadin-button
                    theme="primary"
                    @click="${this.addTodo}">
                    Add todo
                </vaadin-button>
            </div>

            <div class="todos-list">
                ${this.applyFilter(this.todos).map(todo => html`
                    <div class="todo-item">
                        <vaadin-checkbox
                            ?checked="${todo.complete}"                            
                            @change="${e => this.updateTodosStatus(todo, e.target.checked)}"
                        >
                           ${todo.task} 
                        </vaadin-checkbox>
                    </div>
                `)}
            </div>

            <vaadin-radio-group
                class="vibility-filters"
                value="${this.filter}"
                @value-changed="${this.filterChanged}"
            >
                ${Object.values(VisibilityFilters).map(filter => html`
                    <vaadin-radio-button value="${filter}">${filter}</vaadin-radio-button>
                `)}
            </vaadin-radio-group>

            <vaadin-button 
                theme="secondary"
                @click="${this.clearCompleted}">
                Clear completed
            </vaadin-button>
        `;
    }

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.complete);
    }

    filterChanged(event)  {
        this.filter = event.target.value;
    }

    applyFilter(todos) {
        switch(this.filter) {
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.complete);
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.complete);
            default:
                return todos;                
        }
    }

    updateTodosStatus(updatedTodo, complete) {
        this.todos = this.todos.map(todo => 
            updatedTodo === todo ? {...updatedTodo, complete} : todo
        );
    }

    shortcutListener(event) {
        if(event.key === "Enter") {
            this.addTodo();
        }
    }

    updateTask(event) {
        this.task = event.target.value;
    }

    addTodo() {
        if(this.task) {
            this.todos = [...this.todos, {
                task: this.task,
                complete: false
            }];
            this.task = '';
        }
    }

    createRenderRoot() {
        return this;
    }
}

customElements.define('todo-view', TodoView);