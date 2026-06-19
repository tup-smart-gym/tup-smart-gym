import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { MembersApiService } from './members-api.service';
import { Member } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class MembersStateService {
  private storage = inject(StorageService);
  private api = inject(MembersApiService);

  getMembers(): Observable<Member[]> {
    if (this.storage.isValid()) {
      return of(this.storage.get());
    } else {
      return this.api.fetchMembers().pipe(tap((data: Member[]) => this.storage.set(data)));
    }
  }
}
