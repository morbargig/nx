import {Observable, timer} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn,} from '@angular/forms';
import {map, switchMap} from 'rxjs/operators';

export class AppValidators {

  public static greaterThanOrEquals(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!!control?.parent) {
        const otherControl = control.parent?.get(controlName);
        if (!!otherControl) {
          const current = parseFloat(control?.value || '0');
          const other = parseFloat(otherControl?.value || '0');
          let inValid = current <= other;
          if (inValid) {
            setTimeout(() => {
              otherControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
            });
          }
          return inValid
            ? {
              [controlName]: {
                valid: false,
              },
            }
            : null;
        }
      }
      return null;
    };
  }

  public static smallerThanOrEquals(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!!control?.parent) {
        const otherControl = control.parent?.get(controlName);
        if (!!otherControl) {
          const current = parseFloat(control?.value || '0');
          const other = parseFloat(otherControl?.value || '0');
          const inValid = current >= other;
          if (inValid) {
            setTimeout(() => {
              otherControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
            });
          }

          return inValid
            ? {
              [controlName]: {
                valid: false,
              },
            }
            : null;
        }
      }
      return null;
    };
  }

  public static israelIdentity(): ValidatorFn {
    const validation = (id: string) => {
      if (isNaN(Number(id))) {
        return false;
      }
      let strId = id?.toString().trim();
      if (strId.length > 9) {
        return false;
      }
      if (strId.length < 9) {
        while (strId.length < 9) strId = '0' + strId;
      }
      let counter = 0,
        rawVal,
        actualVal;
      for (let i = 0; i < strId.length; i++) {
        rawVal = Number(strId[i]) * ((i % 2) + 1);
        actualVal = rawVal > 9 ? rawVal - 9 : rawVal;
        counter += actualVal;
      }
      return counter % 10 === 0;
    };
    return (control: AbstractControl): { [key: string]: any } => {
      const tz = control?.value;
      if (!!tz) {
        const valid = validation(tz);
        if (!valid) {
          return {
            israelIdentity: true,
          };
        }
      }
      return null;
    };
  }

  public static creditCard(): ValidatorFn {
    const validation = (cardNo: string) => {
      if (isNaN(Number(cardNo))) {
        return false;
      }
      let s = 0;
      let doubleDigit = false;
      for (let i = cardNo.length - 1; i >= 0; i--) {
        let digit = +cardNo[i];
        if (doubleDigit) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        s += digit;
        doubleDigit = !doubleDigit;
      }
      return s % 10 == 0;
    };
    return (control: AbstractControl): ValidationErrors => {
      const tz = control?.value;
      if (!!tz) {
        const valid = validation(tz);
        if (!valid) {
          return {
            creditcard: 'Portal.Forms.Validation.Errors.CreditCard',
          };
        }
      }
      return null;
    };
  }

  public static olderThan(age: number): ValidatorFn {
    const validation = (value: string) => {
      const from = value.split('-'); // DD MM YYYY
      const year = Number(from[0]);
      const date = new Date();
      return date.getFullYear() - year > age;
    };
    return (control: AbstractControl): { [key: string]: any } => {
      const tz = control?.value;
      if (!!tz) {
        const valid = validation(tz);
        if (!valid) {
          return {
            olderThan: true,
          };
        }
      }
      return null;
    };
  }

  public static greaterThanToday(): ValidatorFn {
    return this.afterThan(new Date().toISOString(), null, this.greaterThanToday.name);
  }

  public static afterThanNow(): ValidatorFn {
    return this.afterThan(new Date().toISOString(), null, this.afterThanNow.name);
  }

  public static beforeThanNow(): ValidatorFn {
    return this.beforeThan(new Date().toISOString(), null, this.beforeThanNow.name);
  }

  public static beforeThan(date: string, secundCtrl?: AbstractControl, errorName: string = this.beforeThan.name): ((control: AbstractControl) => { [key: string]: Date }) {
    const validation = (currentD: string): Date => {
      date = secundCtrl?.value || date;
      const validDate = (d: string) => (!!d ? Date.parse(d) || null : null);
      if (!!validDate(currentD) && !!validDate(date) && +validDate(currentD) > +validDate(date)) {
        return new Date(validDate(date));
      }
    };
    return (control: AbstractControl): { [key: string]: Date } => {
      const {value} = control;
      if (!!value) {
        const anValid = validation(value);
        if (!!anValid) {
          return {
            [errorName]: anValid,
          };
        }
      }
    };
  }

  public static afterThan(date: string, secundCtrl?: AbstractControl, errorName: string = this.afterThan.name): ValidatorFn {
    const validation = (currentD: string) => {
      date = secundCtrl?.value || date;
      const validDate = (d: string): number => Date.parse(d) || null;
      return !!validDate(currentD) && !!validDate(date) && +validDate(currentD) < +validDate(date);
    };
    return (control: AbstractControl): { [key: string]: any } => {
      const d = control?.value;
      if (!!d) {
        const anValid = validation(d);
        if (anValid) {
          return {
            [errorName]: true,
          };
        }
      }
      return null;
    };
  }

  public static serverValidation(
    service: any,
    action: string,
    key: string,
    formFields?: Function
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(350).pipe(
        switchMap(() => {
          const actionParams = [];
          if (!!formFields) {
            actionParams.push(...formFields(control));
          }
          return service[action](control.value, ...actionParams).pipe(
            map((valid) => {
              if (!valid) {
                return {[key]: true}
              }
              return null;
            })
          );
        })
      );
    };
  }

  // public static groupValidations(getErrorNames: (values: any) => string): ValidatorFn {
  //   return (group: AbstractControl): { [key: string]: any } => {
  //     let errorName = getErrorNames((group as FormGroup).getRawValue());
  //     return !errorName
  //       ? null
  //       : {
  //         [errorName]: {
  //           valid: false,
  //         },
  //       };
  //   };
  // }

  // public static controlValidations(getErrorNames: (value: any) => string): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     let errorName = getErrorNames(control.value);
  //     return !errorName
  //       ? null
  //       : {
  //         [errorName]: {
  //           valid: false,
  //         },
  //       };
  //   };
  // }

  // public static requiredIfOtherFieldValid(controlName: string): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     let otherControl = control.parent && control.parent.controls[controlName];
  //     return !!otherControl && !!otherControl.valid
  //       ? null
  //       : {
  //         [controlName]: {
  //           valid: false,
  //         },
  //       };
  //   };
  // }
  // public static requiredIfOtherFieldHasThisValue(controlName: string, val: any): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     const otherControl = control?.parent && control.parent?.controls?.[controlName];
  //     return !!otherControl && !!otherControl.value !== val
  //       ? {
  //         [controlName]: {
  //           valid: false,
  //         },
  //       } : null
  //   };
  // }

  // public static dynamicMax(propertyName: string): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     const otherControlVal = control?.parent?.controls[propertyName]?.value; //control.parent && control.parent.controls[controlName];
  //     return !control?.value || (!!otherControlVal && parseFloat(control.value) <= parseFloat(otherControlVal))
  //       ? null
  //       : {
  //         dynamicMax: {
  //           valid: false,
  //         },
  //       };
  //   };
  // }

  // public static requiredIfOtherFieldTrue(controlName: string, dependantControlNames: string[]): ValidatorFn {
  //   return (group: AbstractControl): ValidationErrors | null => {
  //     if (!group) {
  //       return null;
  //     }
  //     let otherControl = (group as FormGroup).controls[controlName];
  //     if (!!otherControl && !!otherControl.value) {
  //       let valid: boolean = true;
  //       var dict = {};

  //       for (let i = 0; i < dependantControlNames.length; i++) {
  //         const name = dependantControlNames[i];
  //         let control = (group as FormGroup).controls[name];
  //         if (!!control) {
  //           control.setValidators([Validators.required]);
  //           valid = !!valid && !!control.value;
  //           if (!control.value) {
  //             dict[name] = { valid: !!control.value };
  //           }
  //         }
  //       }
  //       return !valid ? dict : null;
  //     } else if (!!otherControl) {
  //       for (let i = 0; i < dependantControlNames.length; i++) {
  //         const name = dependantControlNames[i];
  //         let control = (group as FormGroup).controls[name];
  //         if (!!control) {
  //           control.clearValidators();
  //         }
  //       }
  //     }

  //     return null;
  //   };
  // }
}
