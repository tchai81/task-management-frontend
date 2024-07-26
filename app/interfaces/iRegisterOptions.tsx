interface IFormValidationRule {
  required?: string;
}

export default interface IRegisterOptions {
  title: IFormValidationRule;
  priority: IFormValidationRule;
}
