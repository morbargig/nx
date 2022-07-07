describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formtextcomponent--primary'));
  it('should render the component', () => {
    cy.get('fnx-nx-app-form-text').should('exist');
  });
});