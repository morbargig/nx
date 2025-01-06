describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formarraycomponent--primary'));
  it('should render the component', () => {
    cy.get('softbar-app-form-array').should('exist');
  });
});