import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ITableColumn,
  TableColumnType,
  TableComponent,
} from '@softbar/front/dynamic-table';
import { User } from '@softbar/api-interfaces';
import {
  DynamicFormBuilderService,
  DynamicFormControl,
  DynamicFormGroupComponent,
} from '@softbar/front/dynamic-forms';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { of, startWith } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';

enum Tabs {
  'Columns' = 'Edit the table Columns configuration',
  'Items' = 'Edit the table items',
}

type entityType = Pick<
  User,
  'age' | 'name' | 'roles' | 'job' | 'isHappy' | 'friends'
>;
type entityColumnsType = Pick<
  ITableColumn<entityType>,
  'field' | 'type' | 'label' | 'hidden' // | 'bodyStyle'
>;

@Component({
  selector: 'softbar-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DynamicFormGroupComponent,
    MatTabsModule,
  ],
  templateUrl: './table.component.html',
})
export class TestingTableComponent {
  constructor(private dfb: DynamicFormBuilderService) {}
  tabs: typeof Tabs = Tabs;
  readonly originalItems: entityType[] = [
    {
      name: 'Alice Johnson',
      age: 29,
      isHappy: true,
      roles: ['Admin', 'Manager'],
      job: {
        title: 'Software Engineer',
        salary: 95000,
        coworkers: [
          { name: 'Bob Smith', phoneNumber: 1234567890 },
          { name: 'Eve Carter', phoneNumber: 2345678901 },
        ],
      },
      friends: [
        {
          name: 'Bob Smith',
          phoneNumber: 1234567890,
          bestFriend: { name: 'Bob Smith', phoneNumber: 1234567890 },
          friends: [
            {
              name: 'Bob Smith',
              phoneNumber: 1234567890,
              friends: [{ name: 'Bob Smith', phoneNumber: 1234567890 }],
            },
          ],
        },
      ],
    },
    {
      name: 'Bob Smith',
      age: 35,
      isHappy: true,
      roles: ['Developer'],
      job: {
        title: 'Backend Developer',
        salary: 85000,
        coworkers: [
          { name: 'Alice Johnson', phoneNumber: 3456789012 },
          { name: 'Charlie Brown', phoneNumber: 4567890123 },
        ],
      },
    },
    {
      name: 'Charlie Brown',
      age: 40,
      isHappy: true,
      roles: ['Team Lead'],
      job: {
        title: 'Project Manager',
        salary: 110000,
        coworkers: [
          { name: 'Daisy Parker', phoneNumber: 5678901234 },
          { name: 'Bob Smith', phoneNumber: 6789012345 },
        ],
      },
    },
    {
      name: 'Daisy Parker',
      age: 28,
      isHappy: true,
      roles: ['HR'],
      job: {
        title: 'HR Specialist',
        salary: 65000,
        coworkers: [
          { name: 'Charlie Brown', phoneNumber: 7890123456 },
          { name: 'Ethan Lee', phoneNumber: 8901234567 },
        ],
      },
    },
    {
      name: 'Ethan Lee',
      age: 32,
      isHappy: false,
      roles: ['Data Scientist'],
      job: {
        title: 'AI Researcher',
        salary: 120000,
        coworkers: [
          { name: 'Daisy Parker', phoneNumber: 9012345678 },
          { name: 'Fiona Scott', phoneNumber: 1234509876 },
        ],
      },
    },
    {
      name: 'Fiona Scott',
      age: 27,
      isHappy: false,
      roles: ['QA Engineer'],
      job: {
        title: 'Quality Analyst',
        salary: 70000,
        coworkers: [
          { name: 'Ethan Lee', phoneNumber: 2345609876 },
          { name: 'George Adams', phoneNumber: 3456709876 },
        ],
      },
    },
    {
      name: 'George Adams',
      age: 31,
      isHappy: false,
      roles: ['DevOps Engineer'],
      job: {
        title: 'Cloud Engineer',
        salary: 105000,
        coworkers: [
          { name: 'Fiona Scott', phoneNumber: 4567809876 },
          { name: 'Hannah Miller', phoneNumber: 5678909876 },
        ],
      },
    },
    {
      name: 'Hannah Miller',
      age: 26,
      isHappy: false,
      roles: ['Marketing'],
      job: {
        title: 'Marketing Coordinator',
        salary: 60000,
        coworkers: [
          { name: 'George Adams', phoneNumber: 6789009876 },
          { name: 'Ian Carter', phoneNumber: 7890109876 },
        ],
      },
    },
    {
      name: 'Ian Carter',
      age: 38,
      isHappy: true,
      roles: ['Finance'],
      job: {
        title: 'Financial Analyst',
        salary: 90000,
        coworkers: [
          { name: 'Hannah Miller', phoneNumber: 8901209876 },
          { name: 'Jack Roberts', phoneNumber: 9012309876 },
        ],
      },
    },
    {
      name: 'Jack Roberts',
      age: 45,
      isHappy: true,
      roles: ['CEO'],
      job: {
        title: 'Chief Executive Officer',
        salary: 200000,
        coworkers: [
          { name: 'Ian Carter', phoneNumber: 1234501234 },
          { name: 'Alice Johnson', phoneNumber: 2345601234 },
        ],
      },
    },
  ];
  items: entityType[] = this.originalItems;
  addingColumnsFormGroup: FormGroup;
  group: FormGroup<{ __: FormArray<FormGroup<any>> }> = new FormGroup<any>({});
  readonly columnsDynamicFormConfig: DynamicFormControl<{
    __: entityColumnsType[];
  }> = {
    field: '__',
    type: 'FormArray',
    controlType: 'array',
    data: {
      formGroupConfig: (() => {
        const bodyStyle: DynamicFormControl['bodyStyle'] = {
          label: {
            styleClass: 'hidden',
          },
        };
        return [
          {
            field: 'field',
            label: 'Filed',
            type: 'FormSelect',
            value: 'name',
            bodyStyle,
            validation: [Validators.required],
            data: {
              options: of(
                Object.keys(this.items.at(0)).map((i) => ({
                  label: i,
                  value: i,
                }))
              ),
            },
          },
          {
            field: 'type',
            label: 'Type',
            value: 'Default',
            type: 'FormSelect',
            bodyStyle,
            validation: [Validators.required],
            data: {
              options: of(
                Object.keys(TableColumnType)
                  .filter((i) => isNaN(Number(i)))
                  .map((i) => ({
                    label: i,
                    value: i,
                  }))
              ),
            },
          },
          {
            field: 'hidden',
            type: 'FormCheckbox',
            label: 'Hidden',
            bodyStyle,
          },
          {
            field: 'label',
            label: 'Label',
            type: 'Default',
            bodyStyle,
            validation: [Validators.required],
            registerControl: ({ control }) => {
              const formGroup: FormGroup = control.parent as any;
              if (!this.addingColumnsFormGroup) {
                this.addingColumnsFormGroup = formGroup;
              }
              const otherControl = formGroup?.controls?.['field'];
              otherControl?.valueChanges
                .pipe(startWith(otherControl.value))
                .subscribe((x) => {
                  const label = x.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  );
                  control.setValue(label);
                });
            },
          },
        ];
      })(),
    },
  };
  readonly itemsDynamicFormConfig: DynamicFormControl<{
    _: entityType[];
  }> = this.dfb.fromJsonArrayToConfigRecursion(this.originalItems);

  readonly originalColumn: entityColumnsType[] = [
    {
      field: 'name',
      type: 'Default',
      label: 'Name',
    },
    {
      field: 'age',
      label: 'Age',
      type: 'Default',
    },
    {
      field: 'roles',
      label: 'Roles',
      type: 'Default',
    },
    {
      field: 'job',
      label: 'Jobs',
      type: 'Json',
    },
    {
      field: 'friends',
      label: 'Friends',
      type: 'Json',
    },
    {
      field: 'isHappy',
      label: 'Is Happy',
      type: 'Boolean',
    },
    {
      field: 'job',
      label: 'More Data',
      type: 'Extends',
    },
  ];
  columns: ITableColumn<entityType>[] = this.originalColumn as any;
  eColumns: ITableColumn<entityType['job']>[] = [
    {
      field: 'title',
      type: 'Default',
    },
  ];
  getExtendsData: TableComponent<entityType, entityType['job']>['getExtendsData'] = (
    i?
  ) => i.job;

  formOnSubmitEditColumns(event: { __: entityColumnsType[] }) {
    this.columns = event.__ as any;
  }
  formOnSubmitEditItems(event: { _: entityType[] }) {
    this.items = event._ as any;
  }

  applyCurrentColumnsEditMode() {
    this.group.controls.__.clear();
    this.originalColumn.forEach((i) => {
      const newGroup = this.dfb.recursionBuildGroup(
        (this.columnsDynamicFormConfig.data as any).formGroupConfig
      );
      newGroup.patchValue(i);
      this.group.controls.__.push(newGroup);
    });
  }
}
