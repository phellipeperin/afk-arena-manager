const ruleRequired = (value: string): string | boolean => !!value || 'Required';
const ruleMinLength = (value: string, minLength: number): string | boolean => (value && value.length >= minLength) || `Min ${minLength} characters`;
const ruleMaxLength = (value: string, maxLength: number): string | boolean => (value && value.length <= maxLength) || `Max ${maxLength} characters`;
const ruleIsEmail = (value: string): string | boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) || 'Invalid Email';
};
const ruleIsURL = (value: string): string | boolean => {
  const re = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator;
  return re.test(value) || 'Invalid URL';
};
const ruleIsEqual = (value: string, otherValue: string): string | boolean => (value && otherValue && value === otherValue) || 'Values don\'t match';

interface ValidationField {
  hasError: boolean;
  rules: Array<Function>;
}

interface ValidationFieldList {
  [key: string]: ValidationField;
}

export {
  ruleRequired,
  ruleMinLength,
  ruleMaxLength,
  ruleIsEmail,
  ruleIsURL,
  ruleIsEqual,
};

export default class Validation {
  hasAnyError: boolean;
  hasAnyRule: boolean;
  fields: ValidationFieldList;

  constructor() {
    this.hasAnyError = false;
    this.hasAnyRule = false;
    this.fields = {};
  }

  // Rules
  addRule(field: string, rule: Function): void {
    if (!this.fields[field]) {
      this.fields[field] = Validation.getDefaultValidationField();
    }
    this.fields[field].hasError = false;
    this.fields[field].rules.push(rule);
    this.hasAnyRule = true;
  }

  getRules(field: string): Array<Function> {
    if (!this.fields[field]) {
      return [];
    }
    return this.fields[field].rules;
  }

  // State
  changeValidationState(field: string, state: boolean): void {
    if (!this.fields[field]) {
      return;
    }
    this.fields[field].hasError = state;

    let newHasAnyError = false;
    for (const key of Object.keys(this.fields)) {
      if (this.fields[key].hasError) {
        newHasAnyError = true;
        break;
      }
    }
    this.hasAnyError = newHasAnyError;
  }

  // Auxiliar
  reset(): void {
    this.hasAnyError = false;
    this.hasAnyRule = false;
    this.fields = {};
  }

  clear(): void {
    this.hasAnyError = false;
    const newFields: ValidationFieldList = {};
    for (const key of Object.keys(this.fields)) {
      newFields[key] = Validation.getDefaultValidationField();
    }
    this.fields = newFields;
  }

  // Private
  private static getDefaultValidationField(): ValidationField {
    return { hasError: false, rules: [] };
  }
}
