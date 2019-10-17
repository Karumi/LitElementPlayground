import nanoid from 'nanoid';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import 'cypress-shadow-dom';

export const createTodo = (name, complete = false) => {
  return {
    id: nanoid(),
    task: name,
    complete: complete
  };
};

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'viewport'
});

Cypress.Commands.add('stateEquals', expected => {
  cy.window()
    .its('store')
    .invoke('getState')
    .should('deep.equal', expected);
});

Cypress.Commands.add('getTodos', () => {
  return cy
    .window()
    .its('store')
    .invoke('getState')
    .its('todos');
});

Cypress.Commands.add('addTodo', todo => {
  cy.window()
    .its('store')
    .invoke('dispatch', {
      type: 'add_todo',
      todo
    });
});
