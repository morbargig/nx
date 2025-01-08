# front-dynamic-forms

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test front-dynamic-forms` to execute the unit tests.

### Dynamic Wizard

First, we will start with the basic concept of JSON structure. An object continues properties, each one will point at:

1. Primitive (String, Number, Boolean)
2. Object which will recourse the state
3. Array will point on list of (primitive, object, array) which can recourse the state

![Diagram](http://jgraph.github.io/drawio-github/diagram.png)

<a href="http://jgraph.github.io/drawio-github/edit-diagram.html?repo=drawio-github&path=diagram.png" target="_blank">Edit</a> | <a href="https://app.diagrams.net/#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fjgraph%2Fdrawio-github%2Fmaster%2Fdiagram.png" target="_blank">Edit As New</a> | <a href="https://app.diagrams.net/#Hjgraph%2Fdrawio-github%2Fmaster%2Fdiagram.png" target="_blank">Edit with draw.io</a>

<a href="http://jgraph.github.io/drawio-github/edit-diagram.html" target="_blank">edit-diagram.html</a> does the I/O with GitHub and uses draw.io in embed mode for diagram editing. The page supports the following URL parameters: user, pass, repo, path, ref and action=open (the Edit link above is an example). Using action=open, links for immediate diagram editing in GitHub can be created (requires user and pass parameters). You can also use files on GitHub as templates in draw.io via the url parameter (see Edit As New above).

Supported file formats: .png, .svg, .html and .xml (default)

#### locale:

![Diagram]({{REPO_URL}}/blob/{{BRANCH}}/libs/front/dynamic-forms/json-structure-diagram.drawio)
<br>
<a href="https://app.diagrams.net/#H{{REPO_URL}}{{BRANCH}}/libs/front/dynamic-forms/json-structure-diagram.drawio" target="_blank" >Edit</a>



{{BRANCH}}
{{REPO_URL}}

#### remote:

[JSON structure diagram](https://github.morbargig/nx?path=libs/front/dynamic-forms/json-structure-diagram.drawio&_a=preview)

Now, let's look on the JSON data which the wizard should represent:

#### locale:

[Wizard structure diagram](./wizard-structure-diagram.drawio?_a=preview)

#### remote:

[Wizard structure diagram](https://github.morbargig/nx?path=libs/front/dynamic-forms/wizard-structure-diagram.drawio&_a=preview)

```json
// wizard object
{
    "forms":
    [{
        "[stepName]": <JSONStructure>
    }]
}
```

Now, after covering the wanted wizard structure, let's talk about the solution and the technology. We will use [Angular Reactive Forms](https://angular.io/guide/reactive-forms), which is an Angular package that gives us the ability to build any JSON structure as a form.

this is angular package that give us the ability to build any JSON structure as a form

now lets talk about how we use the angular package to answer any JSON structure as a form in the Agents Project

[FieldConfigObj](./src/lib/forms/core/interfaces/field-config.ts)

the type will chose the component that will be create
and the data is like the inputs to this component etc.

this is the typescript interface of how to build any
valid form using the Agent form-builder and angular-reactive-forms

now lets take a look about the wizard typescript interface

[WizardPageConfig](./src/lib/forms/core/interfaces/step-form-group.ts)

this is the wizard first level of configuration

[DynamicSteppedForm](./src/lib/forms/core/interfaces/dynamic-stepped-form.ts)

this is the step configuration

and the group is the <strong>JSON structure</strong> of the step name
in the wizard diagram

```typescript
import { WizardPageConfig } from '@softbar/front/dynamic-forms';
const pageConfig: WizardPageConfig = {
  arrayConfig: {
    controls: [
      {
        title: 'step 1',
        group: [
          {
            field: 'job',
            label: 'Job',
            type: 'FormGroup',
            data: {
              formConfig: [
                { field: 'title', label: 'Title' },
                {
                  field: 'salary',
                  label: 'Salary',
                },
                {
                  type: 'FormArray',
                  field: 'coworkers',
                  label: 'Coworkers',
                  data: {
                    formGroupConfig: [
                      {
                        type: 'Default',
                        field: 'name',
                        label: 'Name',
                      },
                      {
                        type: 'Default',
                        field: 'phoneNumber',
                        label: 'Phone',
                        data: {
                          inputType: 'tel',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      {
        title: 'step 2',
        group: [
          {
            type: 'FormArray',
            field: 'friends',
            label: 'Friend Friends List',
            data: {
              formGroupConfig: [
                {
                  type: 'Default',
                  field: 'name',
                  label: 'Name',
                },
                {
                  type: 'Default',
                  field: 'phoneNumber',
                  label: 'Phone',
                  data: {
                    inputType: 'tel',
                  },
                },
                {
                  type: 'FormArray',
                  field: 'friends',
                  label: 'Friend Friends List',
                  data: {
                    formGroupConfig: [
                      {
                        type: 'Default',
                        field: 'name',
                        label: 'Name',
                      },
                      {
                        type: 'Default',
                        field: 'phoneNumber',
                        label: 'Phone',
                        data: {
                          inputType: 'tel',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  submit: (v) => {
    return alert(JSON.stringify(v));
  },
} as WizardPageConfig;
```

the first step is a custom one and he has to extends some base class to make it valid
the second step is a regular one who use the form builder supported component
the third one is just a step\page with one hidden input with required validator

if the wizard is valid or not
the wizard value or if it change is store at all time in one place


the wizard FormGroup