// import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { FormGroup } from '@angular/forms';
// import { environment } from '../../../../environments/environment';
// import { debounceTime, filter, switchMap, take } from 'rxjs/operators';
// import { FormEditor } from './form-editor';
// import { fromEvent } from 'rxjs';
// import { Field } from '../../@core/interfaces/field';
// import { FieldConfig } from '../../@core/interfaces/field-config';

// @Component({
//   selector: 'app-form-editor',
//   templateUrl: './form-editor.component.html',
//   styleUrls: ['./form-editor.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormEditorComponent
//   extends BaseFieldDirective<FormGroup>
//   implements Field<FormEditor>, OnInit, AfterViewInit {
//   public config: FieldConfig<FormEditor>;
//   public group: FormGroup;
//   public id: string;
//   public html: string;
//   public apiKey: string;
//   public init: any = null;

//   // @ViewChild('editor', { static: true }) public editor: EditorComponent;

//   constructor() {
//     super();
//     this.apiKey = environment.tinyMceApiKey;
//   }

//   private buildSubMenuItems(editor: any, items: SelectItem[]) {
//     return items?.map((e) => {
//       return !!e.items?.length ? {
//         type: 'nestedmenuitem',
//         text: !!e.label ? e.label : e.title,
//         icon: e.icon,
//         getSubmenuItems: () => this.buildSubMenuItems(editor, e.items)
//       } :
//         {
//           type: 'menuitem',
//           text: !!e.label ? e.label : e.title,
//           icon: e.icon,
//           onAction: () => {
//             editor.insertContent(`{{Entity:${e.value}}}`);
//           },
//         };
//     });
//   }

//   private buildSubMenu(editor: any, items?: { title: string; icon?: string; items: SelectItem[] }[]): any {
//     return items?.map((x) => {
//       return {
//         type: 'nestedmenuitem',
//         text: x.title,
//         icon: x.icon,
//         getSubmenuItems: () => this.buildSubMenuItems(editor, x.items)
//       };
//     })
//   }

//   ngOnInit(): void {
//     if (!!this.config?.setter) {
//       this.config.setter.pipe(filter((x) => x.type == 'onPatchValue')).subscribe((appendMe) => {
//         // this.editor.editor.insertContent(appendMe.value);
//       });
//     }
//     if (!!this.config?.data?.tagsToolbar?.length || !!this.config?.data?.localizationSource) {
//       let items: any = null;
//       this.init = {
//         height: 500,
//         relative_urls: true,
//         document_base_url: '',
//         forced_root_block: this.config?.data?.outputFormat == 'html' ? true : false,
//         force_br_newlines: this.config?.data?.outputFormat == 'html' ? true : false,
//         menu: {
//           tags: { title: 'Insert Tags', items: 'entities localization' },
//         },
//         toolbar: 'insert localizationsidebar preview',
//         menubar: 'file edit view format tools tags',
//         setup: (editor: any) => {
//           if (!!this.config?.data?.tagsToolbar?.length) {
//             editor.ui.registry.addMenuButton('insert', {
//               icon: 'comment-add',
//               fetch: (callback: Function) => {
//                 items = items || this.buildSubMenu(editor, this.config?.data?.tagsToolbar);
//                 callback(items);
//               },
//             });
//           }

//           if (!!this.config?.data?.localizationSource) {
//             editor.ui.registry.addSidebar('localizationsidebar', {
//               tooltip: 'Insert Loclaized value',
//               icon: 'translate',
//               onSetup: (api: any) => { },
//               onShow: (api: any) => {
//                 let element = api.element() as HTMLElement;
//                 if (!!element.querySelector('.localization-container')) {
//                   return;
//                 }
//                 const container = document.createElement('form');
//                 container.classList.add('localization-container');
//                 container.classList.add('w-100');

//                 const input = document.createElement('input');
//                 input.type = 'text';
//                 input.placeholder = 'query';
//                 input.classList.add('form-control');

//                 const ul = document.createElement('ul');
//                 ul.classList.add('localization-list');

//                 const itemsBuilder = (res: SelectItem[]) => {
//                   ul.innerHTML = '';
//                   for (let i = 0; i < res.length; i++) {
//                     const element = res[i];
//                     const li = document.createElement('li');
//                     li.setAttribute('data-key', element.value);
//                     li.textContent = element.label;

//                     fromEvent(li, 'click').subscribe((c) => editor.insertContent(`{{Localization:${element.value}}}`));

//                     ul.appendChild(li);
//                   }
//                 };

//                 fromEvent(input, 'keyup')
//                   .pipe(
//                     debounceTime(300),
//                     switchMap((x) => this.config.data.localizationSource(input.value))
//                   )
//                   .subscribe((res) => itemsBuilder(res));

//                 this.config.data
//                   .localizationSource(null)
//                   .pipe(take(1))
//                   .subscribe((res) => itemsBuilder(res));
//                 container.appendChild(input);
//                 container.appendChild(ul);
//                 element.appendChild(container);
//                 console.log('Render panel', api.element());
//               },
//               onHide: (api: any) => {
//                 console.log('Hide panel', api.element());
//               },
//             });
//           }
//         },
//       };
//     } else {
//       this.init = {
//         height: 500,
//         relative_urls: true,
//         document_base_url: '',
//         forced_root_block: this.config?.data?.outputFormat == 'html' ? true : false,
//         force_br_newlines: this.config?.data?.outputFormat == 'html' ? true : false,
//         toolbar: 'preview',
//       };
//     }
//   }

//   ngAfterViewInit(): void { }
// }
