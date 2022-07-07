describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formsteppercomponent--primary&args=activeClass:active;inactiveClass;bodyClass;'));
  it('should render the component', () => {
    cy.get('app-form-stepper').should('exist');
  });
});