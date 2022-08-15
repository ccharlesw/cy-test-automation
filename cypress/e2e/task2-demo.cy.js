describe('empty spec', () => {
  beforeEach(() => {
    cy.networkRequests();
    
  })
  it('passes', () => {
    cy.visit('/');
    // accept cookie
    cy.get('#onetrust-accept-btn-handler').click();
  })
})