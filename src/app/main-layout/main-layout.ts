import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class LayoutComponent {
  // Default view is set to 'items'
  activeView: string = 'items';

  // Method to switch between views
  setActiveView(view: string): void {
    this.activeView = view;
  }
}