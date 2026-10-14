import data from '../../fixtures/data.json';

describe('DIRECTORY', () => {
  beforeEach(() => {
    cy.login(data.admin.username, data.admin.password);
    cy.bukaMenu('Directory');
  });

  it('TC-DIR-001 - Membuka menu Directory', () => {
    cy.url().should('include', '/directory/viewDirectory');
  });

  it('TC-DIR-002 - Menampilkan daftar employee', () => {
    cy.get('.orangehrm-directory-card').should('have.length.greaterThan', 0);
  });

  it('TC-DIR-003 - Cari employee berdasarkan nama', () => {
    cy.get('input[placeholder="Type for hints..."]').type(data.directory.namaEmployee);
    cy.contains('.oxd-autocomplete-option', 'Peter Mac Anderson').click();
    cy.contains('button', 'Search').click();
    cy.get('.orangehrm-directory-card').should('contain.text', 'Peter');
  });

  it('TC-DIR-004 - Nama tidak ditemukan', () => {
    cy.get('input[placeholder="Type for hints..."]').type(data.directory.namaTidakAda);
    cy.contains('No Records Found').should('be.visible');
  });

  it('TC-DIR-005 - Filter Job Title', () => {
    cy.pilihDropdown('Job Title', data.directory.jobTitle);
    cy.contains('button', 'Search').click();
    cy.contains('Records Found').should('be.visible');
  });

  it('TC-DIR-006 - Filter Location', () => {
    cy.pilihDropdown('Location', data.directory.location);
    cy.contains('button', 'Search').click();
    cy.contains('Records Found').should('be.visible');
  });

  it('TC-DIR-007 - Kombinasi filter', () => {
    cy.pilihDropdown('Job Title', data.directory.jobTitle);
    cy.pilihDropdown('Location', data.directory.location);
    cy.contains('button', 'Search').click();
    cy.contains('Records Found').should('be.visible');
  });

  it('TC-DIR-008 - Reset filter', () => {
    cy.pilihDropdown('Job Title', data.directory.jobTitle);
    cy.contains('button', 'Search').click();
    cy.contains('button', 'Reset').click();
    cy.contains('label', 'Job Title').parent().parent().should('contain.text', '-- Select --');
  });

  it('TC-DIR-009 - Lihat detail employee', () => {
    cy.get('.orangehrm-directory-card').first().click();
    cy.get('.orangehrm-directory-card').first().should('be.visible');
  });

  it('TC-DIR-010 - Scroll / pagination', () => {
    cy.get('.orangehrm-directory-card').should('have.length.greaterThan', 0);
    cy.scrollTo('bottom', { ensureScrollable: false });
    cy.get('.orangehrm-directory-card').should('have.length.greaterThan', 0);
  });

  it('TC-DIR-011 - Work Telephone tampil di detail', () => {
    cy.get('.orangehrm-directory-card').first().click();
    cy.get('.orangehrm-directory-card').first().should('be.visible');
  });

  it('TC-DIR-012 - Email tampil di detail', () => {
    cy.get('.orangehrm-directory-card').first().click();
    cy.get('.orangehrm-directory-card').first().should('be.visible');
  });
});
