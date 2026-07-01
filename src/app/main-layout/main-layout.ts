import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class LayoutComponent {}
