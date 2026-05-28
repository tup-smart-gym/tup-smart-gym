import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of,tap, throwError } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  API_URL = 'https://randomuser.me/api/?results=20'
  cache = 'gym_members';
  cacheTime = 'gym_members_timestamp';
  five_minutes = 5 * 60 * 1000;

  constructor(private http: HttpClient){}

  getMembers(): Observable<any[]> {
    if (this.isCacheValid()) {
      const cacheData = localStorage.getItem(this.cache);
      if(cacheData){
        return of(JSON.parse(cacheData))
      }
    }

    return this.http.get<any>(this.API_URL).pipe(
      map(response => {
        return response.results;
      }),
      tap(members => {
        this.saveToCache(members);
      }),
      catchError(error => {
        console.error('Error al obtener datos de la API',error);
        return throwError(() => new Error('No se pudieron cargar los miembros'));
      })
    );
  }
  private isCacheValid(): boolean{
    const cachedTime = localStorage.getItem(this.cacheTime);
    if(!cachedTime) return false;

    const now = new Date().getTime();
    const age = now - parseInt(cachedTime,10);

    return age < this.five_minutes;
  }

  private saveToCache(data: any[]): void{
    localStorage.setItem(this.cache, JSON.stringify(data));
    localStorage.setItem(this.cacheTime, new Date().getTime().toString());
  }
}
