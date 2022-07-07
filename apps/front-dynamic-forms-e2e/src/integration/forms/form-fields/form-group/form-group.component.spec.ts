describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formgroupcomponent--primary'));
  it('should render the component', () => {
    cy.get('fnx-nx-app-form-group').should('exist');
  });
});