import data from '../../fixtures/data.json';

describe('RECRUITMENT', () => {
  beforeEach(() => {
    cy.login(data.admin.username, data.admin.password);
    cy.bukaMenu('Recruitment');
  });

  it('TC-REC-001 - Membuka menu Recruitment', () => {
    cy.url().should('include', '/recruitment');
  });

  it('TC-REC-002 - Daftar Candidates', () => {
    cy.contains('Candidates').click();
    cy.url().should('include', 'viewCandidates');
    cy.contains('Records Found').should('be.visible');
  });

  it('TC-REC-003 - Daftar Vacancies', () => {
    cy.contains('Vacancies').click();
    cy.url().should('include', 'viewJobVacancy');
    cy.contains('Records Found').should('be.visible');
  });

  it('TC-REC-004 - Cari candidate berdasarkan nama', () => {
    cy.contains('Candidates').click();
    cy.get('input[placeholder="Type for hints..."]').type(data.recruitment.namaCandidateCari);
    cy.get('.oxd-autocomplete-option').first().click();
    cy.contains('button', 'Search').click();
    cy.get('.oxd-table-card').should('have.length.greaterThan', 0);
  });

  it('TC-REC-005 - Candidate tidak ditemukan', () => {
    cy.contains('Candidates').click();
    cy.get('input[placeholder="Type for hints..."]').type(data.recruitment.namaTidakAda);
    cy.contains('No Records Found').should('be.visible');
  });

  it('TC-REC-006 - Cari vacancy', () => {
    cy.contains('Vacancies').click();
    cy.pilihDropdown('Vacancy', data.recruitment.vacancyCari);
    cy.contains('button', 'Search').click();
    cy.get('.oxd-table-card').should('contain.text', data.recruitment.vacancyCari);
  });

  it('TC-REC-007 - Tambah vacancy valid', () => {
    const v = data.recruitment.vacancyBaru;
    cy.contains('Vacancies').click();
    cy.contains('button', 'Add').click();
    cy.ambilInput('Vacancy Name').type(v.nama);
    cy.pilihDropdown('Job Title', v.jobTitle);
    cy.ambilInput('Description').type(v.deskripsi);
    cy.get('input[placeholder="Type for hints..."]').type('a');
    cy.get('.oxd-autocomplete-option').first().click();
    cy.contains('button', 'Save').click();
    cy.contains('Success').should('be.visible');
  });

  it('TC-REC-008 - Tambah vacancy tanpa nama', () => {
    const v = data.recruitment.vacancyBaru;
    cy.contains('Vacancies').click();
    cy.contains('button', 'Add').click();
    cy.pilihDropdown('Job Title', v.jobTitle);
    cy.get('input[placeholder="Type for hints..."]').type('a');
    cy.get('.oxd-autocomplete-option').first().click();
    cy.contains('button', 'Save').click();
    cy.contains('Required').should('be.visible');
  });

  it('TC-REC-009 - Edit vacancy', () => {
    const v = data.recruitment.vacancyBaru;
    cy.contains('Vacancies').click();
    cy.contains('.oxd-table-card', v.nama).find('.bi-pencil-fill').click();
    cy.ambilInput('Description').clear().type(v.deskripsiBaru);
    cy.contains('button', 'Save').click();
    cy.contains('Success').should('be.visible');
  });

  it('TC-REC-010 - Hapus vacancy', () => {
    const v = data.recruitment.vacancyBaru;
    cy.contains('Vacancies').click();
    cy.contains('.oxd-table-card', v.nama).find('.bi-trash').click();
    cy.contains('button', 'Yes, Delete').click();
    cy.contains('Success').should('be.visible');
  });

  it('TC-REC-011 - Tambah candidate valid', () => {
    const c = data.recruitment.candidateBaru;
    cy.contains('Candidates').click();
    cy.contains('button', 'Add').click();
    cy.get('input[name="firstName"]').type(c.namaDepan);
    cy.get('input[name="middleName"]').type(c.namaTengah);
    cy.get('input[name="lastName"]').type(c.namaBelakang);
    cy.pilihDropdown('Vacancy', c.vacancy);
    cy.ambilInput('Email').type(c.email);
    cy.contains('button', 'Save').click();
    cy.contains('Success').should('be.visible');
  });

  it('TC-REC-012 - Tambah candidate tanpa data wajib', () => {
    cy.contains('Candidates').click();
    cy.contains('button', 'Add').click();
    cy.contains('button', 'Save').click();
    cy.contains('Required').should('be.visible');
  });
});
