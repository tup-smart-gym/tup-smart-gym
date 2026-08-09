import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MembersStateService } from '../services/members-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';

export interface Member {
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
    state: string; // Agregado para arreglar el error TS2339
    country: string;
  };
  dob: {
    age: number;
  };
  email: string;
  phone: string;
  picture: {
    // Le sacamos el "?" para arreglar el error TS2532
    large: string;
    medium: string;
    thumbnail: string;
  };
}

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, TranslatePipe],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UsersComponent implements OnInit {
  private membersState = inject(MembersStateService);
  private cdr = inject(ChangeDetectorRef);

  members: Member[] = [];
  filteredMembers: Member[] = [];

  isLoading = false;
  errorMessage = '';

  filterText = '';
  sortBy = '';

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const startTime = Date.now();

    this.membersState.getMembers().subscribe({
      next: (data) => {
        const duration = Date.now() - startTime;
        const remainingTime = Math.max(0, 4000 - duration);

        setTimeout(() => {
          this.members = data;
          this.filteredMembers = [...data];
          this.isLoading = false;
          this.cdr.detectChanges();
        }, remainingTime);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilterAndSort(): void {
    let result = [...this.members];

    if (this.filterText.trim() !== '') {
      const search = this.filterText.toLocaleLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.first.toLowerCase().includes(search) ||
          m.name.last.toLowerCase().includes(search) ||
          m.location.city.toLowerCase().includes(search) ||
          m.location.country.toLowerCase().includes(search),
      );
    }

    if (this.sortBy !== '') {
      result.sort((a, b) => {
        if (this.sortBy === 'name') {
          return a.name.first.localeCompare(b.name.first);
        }
        if (this.sortBy === 'lastName') {
          return a.name.last.localeCompare(b.name.last);
        }
        if (this.sortBy === 'age') {
          return a.dob.age - b.dob.age;
        }
        return 0;
      });
    }
    this.filteredMembers = result;
  }
}
