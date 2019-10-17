import { createTodo } from '../support/commands';

describe('Todo view', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('show empty todos', () => {
        cy.matchImageSnapshot();
    });

    it('add new todo', () => {
        const taskName = 'Task 1';

        typeAndAddTask(taskName);

        cy.contains(taskName).should('not.have.attr', 'checked');
        cy.getTodos()
            .should('have.length', 1)
            .its('0')
            .should((todo) => {
                expect(todo.task).to.equal(taskName);
                expect(todo.complete).to.equal(false);
            });
    });

    it('add consecutive todos', () => {
        const firstTask = 'Task 1';
        const secondTask = 'Task 2';

        typeAndAddTask(firstTask);
        typeAndAddTask(secondTask);

        cy.contains(firstTask).should('not.have.attr', 'checked');
        cy.contains(secondTask).should('not.have.attr', 'checked');

        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const firstTodo = state.todos[0]
                expect(firstTodo.task).to.equal(firstTask);
                expect(firstTodo.complete).to.equal(false);

                const secondTodo = state.todos[1]
                expect(secondTodo.task).to.equal(secondTask);
                expect(secondTodo.complete).to.equal(false);
            });
    });

    it('show all todos', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.matchImageSnapshot();
    });

    it('show only active todos', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.contains('Active').click();
        cy.get('completed task', { timeout: 0 }).should('not.exist');

        cy.matchImageSnapshot();
    });

    it('show only complete todos', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.contains('Completed').click();
        cy.get('active task', { timeout: 0 }).should('not.exist');

        cy.matchImageSnapshot();
    });

    it('show checked task when click on it', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.contains("active task")
            .click()
            .should('have.attr', 'checked');
        cy.matchImageSnapshot();
    });

    it('move from active to complete when click on active task', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.contains('Active').click();
        cy.contains("active task").click();
        cy.get('active task', { timeout: 0 }).should('not.exist');

        cy.matchImageSnapshot();
    });

    it('move from completed to active when click on completed task', () => {

        cy.addTodo(createTodo("completed task", true));
        cy.addTodo(createTodo("active task"));

        cy.contains('Completed').click();
        cy.contains("completed task").click();
        cy.get('completed task', { timeout: 0 }).should('not.exist');

        cy.matchImageSnapshot();
    });

    it('clear completed task when click on clean completed', () => {

        cy.addTodo(createTodo("completed task", true));
        const activeTask = createTodo("active task");
        cy.addTodo(activeTask);

        cy.get('#clear-completed').click();
        cy.get('completed task', { timeout: 0 }).should('not.exist');
        cy.stateEquals({
            todos: [activeTask],
            filter: 'All',
        });

        cy.matchImageSnapshot();
    });
});

const typeAndAddTask = (task) => {
    cy.shadowGet('vaadin-text-field')
        .shadowType(task);

    cy.contains('Add todo').click();
};