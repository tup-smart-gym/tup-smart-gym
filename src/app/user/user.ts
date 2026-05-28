import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { UserServices } from '../services/items';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user',
  imports: [CommonModule,FormsModule,MatProgressSpinnerModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UsersComponent implements OnInit {
  members: any[] = [];
  filteredMembers: any[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';

  filterText: string = '';
  sortBy: string = '';

  constructor(private userService: UserServices,
              private cdr: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void{
    this.isLoading = true;
    this.errorMessage = '';
    const startTime = Date.now();
    
    this.userService.getMembers().subscribe({
      next: (data) => {
        const duration = Date.now()  - startTime;
        const remainingTime = Math.max(0,4000 - duration);

        setTimeout(() => {
          this.members = data
          this.filteredMembers = [...data];
          this.isLoading = false;
          this.cdr.detectChanges();
        },remainingTime)
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilterAndSort(): void{
    let result = [...this.members];

    if(this.filterText.trim() !== ''){
      const search = this.filterText.toLocaleLowerCase().trim();
      result = result.filter(m =>
        m.name.first.toLowerCase().includes(search) ||
        m.name.last.toLowerCase().includes(search) ||
        m.location.city.toLowerCase().includes(search) ||
        m.location.country.toLowerCase().includes(search)
      );
    }

    if(this.sortBy !== ''){
      result.sort((a,b) =>{
        if(this.sortBy == 'name'){
          return a.name.first.localeCompare(b.name.first);
        }
        if(this.sortBy === 'lastName'){
          return a.name.last.localeCompare(b.name.last);
        }
        if(this.sortBy === 'age'){
          return a.dob.age - b.dob.age;
        }
        return 0;
      });
    }
    this.filteredMembers = result;
  }
}