import data from '../../fixtures/data.json';

describe('LOGIN', () => {
  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  it('TC-LOGIN-001 - Login valid', () => {
    cy.get('input[name="username"]').type(data.admin.username);
    cy.get('input[name="password"]').type(data.admin.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC-LOGIN-002 - Username tidak valid', () => {
    cy.get('input[name="username"]').type(data.salah);
    cy.get('input[name="password"]').type(data.admin.password);
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-003 - Password tidak valid', () => {
    cy.get('input[name="username"]').type(data.admin.username);
    cy.get('input[name="password"]').type(data.salah);
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-004 - Username dan password tidak valid', () => {
    cy.get('input[name="username"]').type(data.salah);
    cy.get('input[name="password"]').type(data.salah);
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-005 - Username kosong', () => {
    cy.get('input[name="password"]').type(data.admin.password);
    cy.get('button[type="submit"]').click();
    cy.contains('Required').should('be.visible');
  });

  it('TC-LOGIN-006 - Password kosong', () => {
    cy.get('input[name="username"]').type(data.admin.username);
    cy.get('button[type="submit"]').click();
    cy.contains('Required').should('be.visible');
  });

  it('TC-LOGIN-007 - Username dan password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
  });

  it('TC-LOGIN-008 - Password tersembunyi', () => {
    cy.get('input[name="password"]').type(data.admin.password);
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC-LOGIN-009 - Username case-sensitive', () => {
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type(data.admin.password);
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-010 - Password case-sensitive', () => {
    cy.get('input[name="username"]').type(data.admin.username);
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC-LOGIN-011 - Forgot your password', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', 'requestPasswordResetCode');
    cy.contains('Reset Password').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
  });

  it('TC-LOGIN-012 - Login pakai tombol Enter', () => {
    cy.get('input[name="username"]').type(data.admin.username);
    cy.get('input[name="password"]').type(data.admin.password + '{enter}');
    cy.url().should('include', '/dashboard');
  });
});
