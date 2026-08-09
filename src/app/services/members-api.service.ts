import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Member } from '../user/user';

interface RandomUserResponse {
  results: Member[];
}

@Injectable({
  providedIn: 'root',
})
export class MembersApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://randomuser.me/api/?results=20';

  fetchMembers(): Observable<Member[]> {
    return this.http
      .get<RandomUserResponse>(this.API_URL)
      .pipe(map((response) => response.results));
  }
}
