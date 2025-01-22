import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'softbar-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports:[
    RouterModule
  ]
})
export class AppComponent {}
