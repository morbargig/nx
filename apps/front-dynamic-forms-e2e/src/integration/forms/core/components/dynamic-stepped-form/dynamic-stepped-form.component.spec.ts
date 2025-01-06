describe('front-dynamic-forms', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dynamicsteppedformcomponent--primary&args=stepBody;useStepperService;config;validation;errorMessages;formRowCssClass;formCssClass;bodyClass;isLinear:true;isEditable:true;footerMode;formValue;form;'));
  it('should render the component', () => {
    cy.get('softbar-app-dynamic-stepped-form').should('exist');
  });
});