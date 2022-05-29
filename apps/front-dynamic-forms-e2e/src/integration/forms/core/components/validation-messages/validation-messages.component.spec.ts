describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=validationmessagescomponent--primary&args=takeOne:true;filedLabel;control;messages;'));
  it('should render the component', () => {
    cy.get('fnx-nx-app-validation-messages').should('exist');
  });
});