describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formarraycomponent--primary'));
  it('should render the component', () => {
    cy.get('fnx-nx-app-form-array').should('exist');
  });
});