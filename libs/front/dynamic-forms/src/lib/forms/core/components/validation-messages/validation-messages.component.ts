import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  skip,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { merge } from 'rxjs';
import { KeyValue } from '@angular/common';

export interface TranslateSelectItem {
  /**
   * filed label
   */
  filedLabel?: string;
  /**
   * error name
   */
  errorName?: string;
  /**
   * translate item
   */
  label?: string;
  /**
   * translate params named value // similar to entity
   */
  value?: string;
  /**
   * translate params object
   */
  data?: { [key: string]: string | number };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type IntelligenceKeys<T extends U, U = string> = T | (U & {});

type supportedDefaultValuationsErrors =
  | 'required'
  | 'max'
  | 'min'
  | 'minLength'
  | 'email'
  | 'pattern';

@Component({
  selector: 'softbar-app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessagesComponent implements OnInit, OnDestroy {
  public errorMessages: TranslateSelectItem[];
  public ended: EventEmitter<void> = new EventEmitter<void>();
  @Input() public filedLabel: string;
  @Input() public control: AbstractControl;

  constructor(private cd: ChangeDetectorRef) {}

  @Input()
  public set messages(msgObj: {
    [error: string]: string | TranslateSelectItem;
  }) {
    if (msgObj) {
      this.errorMessages = [...this.getErrorMessages(msgObj)];
      this.render();
    }
  }

  private static getDefaultErrorMessage = (
    { key, value }: { key: supportedDefaultValuationsErrors; value: any },
    filedLabel: string
  ): TranslateSelectItem => {
    const baseErrorBody: TranslateSelectItem = { errorName: key, filedLabel };
    switch (key) {
      // case Validators.required.name: {
      //   return { ...baseErrorBody, label: 'Portal.Common.Required', value: filedLabel }
      //   break
      // }
      // case Validators.max.name: {
      //   const { actual, max } = value
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Forms.Validation.Errors.Max',
      //     data: {
      //       entity: filedLabel,
      //       val: max,
      //     }
      //   }
      //   break
      // }
      // case Validators.min.name: {
      //   const { actual, min } = value
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Forms.Validation.Errors.Min',
      //     data: {
      //       val: min,
      //       entity: filedLabel,
      //     }
      //   }
      //   break
      // }
      // case Validators.minLength.name: {
      //   const { actualLength, requiredLength } = value
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Forms.Validation.Errors.MinLength',
      //     data: {
      //       chars: requiredLength,
      //       entity: filedLabel,
      //     }
      //   }
      //   break
      // }
      // case Validators.maxLength.name: {
      //   const { actualLength, requiredLength } = value
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Forms.Validation.Errors.MinLength',
      //     data: {
      //       chars: requiredLength,
      //       entity: filedLabel,
      //     }
      //   }
      //   break
      // }
      // case Validators.email.name: {
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Forms.Validation.Errors.Email',
      //   }
      //   break
      // }
      // case Validators.pattern.name: {
      //   const { requiredPattern, actualValue } = value
      //   const regexName = Object.keys(AppRegexService)?.find(i => AppRegexService?.[i]?.toString() === requiredPattern)
      //   const translateName = `Portal.Common.${regexName?.charAt(0)?.toUpperCase() + regexName?.slice(1)}`
      //   const patternTranslateName = `Portal.Forms.Validation.Errors.Pattern.${regexName?.charAt(0)?.toUpperCase() + regexName?.slice(1)}`
      //   if (translateName !== translatePipe?.transform(translateName)) {
      //     return {
      //       ...baseErrorBody,
      //       label: 'Portal.Forms.Validation.Errors.Pattern',
      //       data: {
      //         pattern: translateName,
      //         entity: filedLabel,
      //       }
      //     }
      //   } else if (patternTranslateName !== translatePipe?.transform(patternTranslateName)) {
      //     return {
      //       ...baseErrorBody,
      //       label: 'Portal.Forms.Validation.Errors.Pattern',
      //       data: {
      //         pattern: patternTranslateName,
      //         entity: filedLabel,
      //       }
      //     }
      //   }
      //   console.log("please add me to translate as validation error message", patternTranslateName)
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Common.Errors.Invalid',
      //     value: filedLabel
      //   }
      //   break
      // }
      // case AppValidators.creditCard.name: {
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Common.Errors.Invalid',
      //     value: filedLabel
      //   }
      //   break
      // }
      // case AppValidators.beforeThan.name: {
      //   const date: ReturnType<ReturnType<typeof AppValidators.beforeThan>>[string] = value
      //   if (Date.parse(date?.toISOString())) {
      //     return {
      //       ...baseErrorBody,
      //       label: 'Portal.Forms.Validation.Errors.BeforeThan',
      //       data: {
      //         date: datePipe.transform(date, 'dd/MM/yy, HH:mm'),
      //         entity: baseErrorBody?.filedLabel
      //       },
      //     }
      //   }
      //   return {
      //     ...baseErrorBody,
      //     label: 'Portal.Common.Errors.Invalid',
      //     value: filedLabel
      //   }
      //   break
      // }
      default: {
        if (typeof value === 'string') {
          return {
            ...baseErrorBody,
            label: value,
            data: { entity: baseErrorBody?.filedLabel },
          };
        }
        return baseErrorBody;
        break;
      }
    }
  };

  // public translateParamObject(errMsg: TranslateSelectItem): Object {
  //   return { ...errMsg, value: errMsg.value, ...errMsg?.data }
  // }

  private static handleErrors(key: string, val: string): TranslateSelectItem {
    const baseErrorBody: TranslateSelectItem = { errorName: key, label: val };
    switch (key) {
      // case (Validators.required.name): {
      //   // const keyTranslateVal = this.translatePipe.transform('Portal.Common.Required')?.replace(/{{.*}}/, '')?.trim()
      //   // const valTranslateVal = this.translatePipe.transform(val)
      //   // if (!valTranslateVal?.includes(keyTranslateVal)) {
      //   //   return { ...baseErrorBody, label: 'Portal.Common.Required', value: val }
      //   // } else if (!!val) {
      //   //   return { ...baseErrorBody }
      //   // }
      //   // return { ...baseErrorBody, label: 'Portal.Common.Required', value: 'Portal.Common.Required.ThisField' }
      // }
      // can handle any error validation
      default:
        return { ...baseErrorBody };
    }
  }

  ngOnDestroy(): void {
    this.ended.next();
    this.ended.complete();
  }

  public hasCustomErrorMessage = (key: string) =>
    key ? this.errorMessages?.find((i) => i.errorName === key) : null;

  render = () => {
    this.cd.detectChanges();
    this.cd.markForCheck();
  };

  ngOnInit() {
    merge(
      this.control.statusChanges?.pipe(skip(1), distinctUntilChanged()),
      this.control?.valueChanges?.pipe(skip(1), distinctUntilChanged())
    )
      .pipe(
        takeUntil(this.ended),
        takeWhile(() => !this.ended?.closed),
        debounceTime(200)
      )
      .subscribe(this.render);
  }

  getDefaultErrorMessage = ({
    key,
    value,
  }: KeyValue<
    IntelligenceKeys<supportedDefaultValuationsErrors>,
    any
  >): TranslateSelectItem =>
    ValidationMessagesComponent.getDefaultErrorMessage(
      {
        key,
        value,
      } as KeyValue<supportedDefaultValuationsErrors, any>,
      this.filedLabel
    );

  private getErrorMessages(msgObj: {
    [error: string]: string | TranslateSelectItem;
  }): TranslateSelectItem[] {
    const keys: string[] = Object.keys(msgObj);
    return keys.map((key: string) => {
      const item: TranslateSelectItem | string = msgObj?.[key];
      switch (typeof item) {
        case 'string': {
          return ValidationMessagesComponent.handleErrors(key, item);
        }
        case 'object': {
          item.label = item?.label || `Portal.Common.Errors.${key}`;
          item.errorName = key;
          return item;
        }
        default: {
          return null;
          break;
        }
      }
    });
  }
}
