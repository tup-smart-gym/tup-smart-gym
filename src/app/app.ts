import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tup-smart-gym');
  public auth = inject(AuthService);
  private translate = inject(TranslateService);

  constructor() {
    this.translate.use('es');
  }
}
