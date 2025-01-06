describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dynamicformgroupcomponent--primary&args=config;mode;validation;errorMessages;hideSubmitButton;showCancelButton;template;formRowCssClass;formCssClass;submitting;errMsgClass;submitText;cancelText;form;'));
  it('should render the component', () => {
    cy.get('softbar-app-dynamic-form-group').should('exist');
  });
});