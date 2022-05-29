describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dynamicformcontrolcomponent--primary&args=control;template;mode;isRequired;hideLabel;parentForm;wrapStyleClass;dynamicControl;'));
  it('should render the component', () => {
    cy.get('fnx-nx-dynamic-form-control').should('exist');
  });
});