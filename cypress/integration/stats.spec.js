import { createTodo } from '../support/commands';

describe('Stats view', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigate to stats without todos', () => {

    cy.contains('Stats')
      .should('have.attr', 'href', '/stats').click();

    cy.contains('p', 'Nothing to do');
    cy.matchImageSnapshot();
  });

  it('show all active task chart', () => {
    cy.addTodo(createTodo("task1"));
    cy.addTodo(createTodo("task2"));

    statsClick();
    cy.matchImageSnapshot();
  });

  it('show all complete task chart', () => {
    cy.addTodo(createTodo("task1", true));
    cy.addTodo(createTodo("task2", true));

    statsClick();
    cy.matchImageSnapshot();
  });

  it('show all complete half tasks', () => {
    cy.addTodo(createTodo("task1", true));
    cy.addTodo(createTodo("task2"));

    statsClick();
    cy.matchImageSnapshot();
  });
});

const statsClick = () => {
  cy.contains('Stats').click();
  cy.wait(900);
}