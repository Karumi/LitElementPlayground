const deferred = require('./deferred');

describe('Login view', () => {
  var loginRequestDeferred;

  beforeEach(() => {
    loginRequestDeferred = deferred();

    cy.visit('/login', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs('http://localhost:9000/auth/local')
          .as('loginRequest')
          .returns(loginRequestDeferred.promise);
      }
    });
  });

  it('not show username on header when not logged in', () => {
    cy.matchImageSnapshot();
  });

  it('show incorrect username or password when click login with no username and password', () => {
    cy.contains('Login').click();

    cy.matchImageSnapshot();
  });

  it('show incorrect username or password when click login without password', () => {
    cy.get('input')
      .first()
      .type('Username');
    cy.contains('Login').click();

    cy.matchImageSnapshot();
  });

  it('show incorrect username or password when click login without username', () => {
    cy.get('input')
      .last()
      .type('password');
    cy.contains('Login').click();

    cy.matchImageSnapshot();
  });

  it('show incorrect username and password when login request returns unauthorized', () => {
    loginRequestDeferred.resolve({
      json() {
        return {};
      },
      ok: false
    });

    cy.get('input')
      .first()
      .type('username');
    cy.get('input')
      .last()
      .type('password');
    cy.contains('Login').click();

    cy.matchImageSnapshot();
  });

  it('redirect to home and display username when login success', () => {
    cy.fixture('login_result').then(data => {      
      loginRequestDeferred.resolve({
        json() {
          return data;
        },
        ok: true
      });
    });

    cy.get('input')
      .first()
      .type('username');
    cy.get('input')
      .last()
      .type('password');
    cy.contains('Login').click();

    cy.matchImageSnapshot();
  });
});
