import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Analytics } from '../services/analytics';
import { every, filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class LayoutComponent {
  private readonly router = inject(Router);
  private readonly analytics = inject(Analytics);

  constructor() {
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(event => {
      const section = this.getSectionFromUrl(event.urlAfterRedirects);
      if (section){
        this.analytics.trackSectionView(section);
      }
    });
  }

  private getSectionFromUrl(url: string): string | null {
    if(url.includes('/main/users')) return 'socios';
    if(url.includes('/main/settings')) return 'configuracion';
    if(url.includes('/main/rooms')) return 'salas';
    return null;
  }
}