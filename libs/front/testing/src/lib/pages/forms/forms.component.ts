import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import {
  DynamicFormBuilderService,
  DynamicFormControlComponent,
  DynamicFormGroupComponent,
} from '@softbar/front/dynamic-forms';
import type { DynamicFormControl } from '@softbar/front/dynamic-forms';
import { firstValueFrom, timer, BehaviorSubject } from 'rxjs';
import type { JsonType, JsonValue, User } from '@softbar/api-interfaces';
// import { FormsApiService } from './services/forms-api.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

enum Tabs {
  'DataJSON' = 'Generate form from any data JSON string',
  'DynamicFormConfigJSON' = 'Generate form from Dynamic Form Config Arr as JSON string',
}

@Component({
  selector: 'softbar-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormControlComponent,
    DynamicFormGroupComponent,
    MatTabsModule,
  ],
})
export class FormsComponent implements OnInit {
  constructor(
    // private formsApiService: FormsApiService,
    private dfb: DynamicFormBuilderService,
    private dialog: MatDialog
  ) {}
  @ViewChild('formComponent', { static: false })
  public formComponent: DynamicFormGroupComponent;
  tabs: typeof Tabs = Tabs;
  selectedTab: Tabs;
  group = new FormGroup(
    <
      {
        dynamicFormForDynamicFormConfigObjectString?: AbstractControl<string>;
        dynamicFormDataObjectString?: AbstractControl<string>;
      }
    >{}
  );
  config: DynamicFormControl<User>[];
  readonly mockUser: User = {
    job: {
      title: 'Software Engineer',
      salary: 85000,
      coworkers: [
        { name: 'Alice', phoneNumber: 1234567890 },
        { name: 'Bob', phoneNumber: 9876543210 },
      ],
    },
    isHappy: true,
    matrix: [
      ['A1', 'B1', 'C1'],
      ['A2', 'B2', 'C2'],
      ['A3', 'B3', 'C3'],
    ],
    roles: ['Admin', 'Editor', 'User'],
    name: 'John Doe',
    age: 30,
    friends: [
      {
        name: 'David',
        phoneNumber: 1112223333,
        bestFriend: {
          name: 'Michael',
          phoneNumber: 4445556666,
        },
        friends: [
          {
            name: 'Sarah',
            phoneNumber: 7778889999,
            friends: [
              { name: 'Emily', phoneNumber: 2223334444 },
              { name: 'Chris', phoneNumber: 5556667777 },
            ],
          },
          {
            name: 'Daniel',
            phoneNumber: 8889990000,
            friends: [
              { name: 'Ethan', phoneNumber: 9990001111 },
              { name: 'Sophia', phoneNumber: 1110009999 },
            ],
          },
        ],
      },
    ],
  };

  selectedTabChange(textLabel: string) {
    this.selectedTab = textLabel as Tabs;
  }

  readonly dynamicFormForDynamicFormConfigObjectString: DynamicFormControl<{
    dynamicFormForDynamicFormConfigObjectString: DynamicFormControl[] & string;
  }> = {
    type: 'Default',
    field: 'dynamicFormForDynamicFormConfigObjectString',
    label: 'From Config',
    placeholder: JSON.stringify([
      {
        type: 'Default',
        field: 'description',
        label: 'Description',
        placeholder: 'Description',
        data: { rows: 5 },
      },
    ] as DynamicFormControl<{ description: '' }>[]),
    validation: [Validators.required, Validators.minLength(10)],
    errorMessages: {
      required: 'Required',
      minlength: 'minlength',
    },
    data: {
      rows: 5,
    },
  };
  readonly dynamicFormDataObjectString: DynamicFormControl<{
    dynamicFormDataObjectString: JsonValue & string;
  }> = {
    type: 'Default',
    field: 'dynamicFormDataObjectString',
    label: 'Any Valid JSON',
    placeholder: JSON.stringify(this.mockUser),
    validation: [Validators.required, Validators.minLength(10)],
    errorMessages: {
      required: 'Required',
      minlength: 'minlength',
    },
    data: {
      rows: 5,
    },
  };

  // defaultForm$ = this.formsApiService.helloForm();
  defaultForm$ = this.hardCodedDynamicFormConfigSetup();
  hardCodedDynamicFormConfigSetup(): BehaviorSubject<
    DynamicFormControl<User>[]
  > {
    return new BehaviorSubject<DynamicFormControl<User>[]>(
      this.dfb.fromJsonToConfigRecursion(this.mockUser as any)
    );
  }

  showDialog(data: JsonType) {
    this.dialog.open(JsonDialogComponent, {
      data: { json: JSON.stringify(data, null, 2) }, // Pass cellData as JSON
      width: '500px',
    });
  }
  formOnSubmit(event: any) {
    this.showDialog(event);
  }

  getOriginalState() {
    firstValueFrom(this.defaultForm$).then((x) => {
      this.config = null;
      firstValueFrom(timer(0))
        .then(() => {
          this.config = x;
        })
        .catch(() =>
          console.error(`something want wrong!
          server is not available at the time`)
        );
    });
  }

  copyFormConfig() {
    this.showDialog(this.config as any);
  }

  ngOnInit(): void {
    this.getOriginalState();
  }
  generateFromDynamicFormConfigJSON() {
    this.config = null;
    firstValueFrom(timer(0)).then(() => {
      this.config = JSON.parse(
        JSON.stringify(
          new Function(
            `return ${
              this.group.getRawValue()
                .dynamicFormForDynamicFormConfigObjectString || '{}'
            }`
          )()
        ) || ''
      );
    });
  }
  generateFromDataJSON() {
    this.config = null;
    firstValueFrom(timer(0)).then(() => {
      this.config = this.dfb.fromJsonToConfigRecursion(
        JSON.parse(
          JSON.stringify(
            new Function(
              `return ${
                this.group.getRawValue().dynamicFormDataObjectString || '{}'
              }`
            )()
          )
        ) || ''
      );
      console.log('config:', this.config);
    });
  }

  generate() {
    switch (this.selectedTab) {
      case Tabs.DynamicFormConfigJSON: {
        this.generateFromDynamicFormConfigJSON();
        break;
      }
      case Tabs.DataJSON:
      default: {
        this.generateFromDataJSON();
        break;
      }
    }
  }

  applyPlaceholder() {
    switch (this.selectedTab) {
      case Tabs.DynamicFormConfigJSON: {
        this.group.controls?.dynamicFormForDynamicFormConfigObjectString?.setValue(
          this.dynamicFormForDynamicFormConfigObjectString.placeholder
        );
        break;
      }
      case Tabs.DataJSON:
      default: {
        this.group.controls?.dynamicFormDataObjectString?.setValue(
          this.dynamicFormDataObjectString.placeholder
        );
        break;
      }
    }
  }

  reset(): void {
    switch (this.selectedTab) {
      case Tabs.DynamicFormConfigJSON: {
        this.group.controls?.dynamicFormForDynamicFormConfigObjectString?.reset();
        break;
      }
      case Tabs.DataJSON:
      default: {
        this.group.controls?.dynamicFormDataObjectString?.reset();
        break;
      }
    }
  }
}

import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `
    <h1 mat-dialog-title>JSON Preview</h1>

    <div mat-dialog-content>
      <pre>{{ data.json }}</pre>
    </div>
    <div mat-dialog-actions class="flex !justify-between">
      <button mat-icon-button (click)="copyToClipboard()">
        <mat-icon>content_copy</mat-icon>
      </button>
      <button m mat-dialog-close>Close</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
})
export class JsonDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { json: string },
    private clipboard: Clipboard
  ) {}

  copyToClipboard() {
    this.clipboard.copy(this.data.json);
  }
}
