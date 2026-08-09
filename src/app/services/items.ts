import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable,throwError } from 'rxjs';

const API_URL = 'https://smartgymback-production-8639.up.railway.app/users';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  constructor(private http: HttpClient){}

  getMembers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL).pipe(
      catchError(this.handleError)
    );
  }

  getMember(id: number): Observable<any> {
    return this.http.get<any[]>(`${API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createMember(member: any): Observable<any> {
    return this.http.post<any[]>(API_URL, member).pipe(
      catchError(this.handleError)
    );
  }

  updateMember(id: number, member: any): Observable<any[]> {
    return this.http.put<any[]>(`${API_URL}/${id}`,member).pipe(
      catchError(this.handleError)
    );
  }
  pathcMember(id: number, changes: Partial<any>): Observable<any> {
    return this.http.patch<any>(`${API_URL}/${id}`,changes).pipe(
      catchError(this.handleError)
    );
  }

  deleteMember(id: number): Observable<void>{
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la peticion a la API',error);
    return throwError(() => error);
  }

}