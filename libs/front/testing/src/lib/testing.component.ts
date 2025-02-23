import { Component, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: ActivatedRoute }],
  template: `
    <h1 class="text-4xl">
      Welcome to testing softbar applications infrastructures
    </h1>
    <div class="container">
      <ng-container *ngIf="formsComponent$ | async as formsComponent">
        <div class="preview-box" tabindex="0" (click)="goToFullPage('forms')">
          <h3>📄 Forms Preview</h3>
          <div class="preview-content freeze" id="forms-preview">
            <ng-container *ngComponentOutlet="formsComponent"></ng-container>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="tableComponent$ | async as tableComponent">
        <div class="preview-box" tabindex="0" (click)="goToFullPage('table')">
          <h3>📊 Table Preview</h3>
          <div class="preview-content freeze" id="table-preview">
            <ng-container *ngComponentOutlet="tableComponent"></ng-container>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 20px;
      }

      .preview-box {
        width: 100%;
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 10px;
        background: #f9f9f9;
        cursor: pointer;
        text-align: center;
        transition: background 0.3s ease;
        outline: none; /* Remove focus outline */
      }

      .preview-box:hover {
        background: #ececec;
      }

      .preview-content {
        pointer-events: none; /* Disable all interactions */
        filter: grayscale(100%) opacity(0.8); /* Freeze the preview */
        user-select: none; /* Prevent selecting text */
        outline: none; /* Remove focus outline */
        position: relative;
      }

      .preview-box:hover .preview-content {
        filter: grayscale(0%) opacity(1); /* Light up on hover */
      }

      .preview-box:focus {
        box-shadow: 0 0 5px #3f51b5; /* Highlight focus */
      }
    `,
  ],
})
export class TestingComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Lazy load FormsComponent
  formsComponent$ = import('./pages/forms/forms.component').then(
    (m) => m.FormsComponent
  );

  // Lazy load TableComponent
  tableComponent$ = import('./pages/table/table.component').then(
    (m) => m.TestingTableComponent
  );

  goToFullPage(page: string) {
    this.router.navigate([page], { relativeTo: this.route });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.disableTabNavigationInsidePreview('forms-preview');
      this.disableTabNavigationInsidePreview('table-preview');
    }, 500); // Ensure elements are loaded before removing tabindex
  }

  private disableTabNavigationInsidePreview(previewId: string) {
    const preview = document.getElementById(previewId);
    if (!preview) return;

    // Find all interactive elements inside the preview
    const focusableElements = preview.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    );

    // Disable tab navigation and interactions
    focusableElements.forEach((el) => {
      (el as HTMLElement).setAttribute('tabindex', '-1');
    });
  }
}
