Cypress.Commands.add('login', (username, password) => {
  cy.visit('/web/index.php/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('bukaMenu', (namaMenu) => {
  cy.get('.oxd-main-menu').contains(namaMenu).click();
});

Cypress.Commands.add('ambilInput', (label) => {
  return cy.contains('label', label).parent().parent().find('input, textarea');
});

Cypress.Commands.add('pilihDropdown', (label, pilihan) => {
  cy.contains('label', label).parent().parent().find('.oxd-select-text').click();
  cy.contains('.oxd-select-option', pilihan).click();
});
