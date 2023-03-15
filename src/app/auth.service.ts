import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://book.yusyah.com/public';

  constructor(private router: Router,private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }
  getRequestsByCustomerId(data : {customerId:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getrequestsbycustomer`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
  createRequest(data : {title:string,details:string,customerId:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createrequest`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
  //expert
  getTasksByExpertId(data : {expertId:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasksexpert`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
  resolveRequest(data:{ requestId:string, expertId :string,status:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updatetask`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
  updateRequestedHours(data:{ requestId:string, expertId :string,requestedHours:number}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updatehours`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
  getCompletedTasksByExpertId(data : {expertId:string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/completedtaskexpert`, data)
      .pipe(
        tap(res => {
        return res;
        })
      );
  }
 //end expert
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userType');
    //redirect to login page
    this.router.navigate(['']);

  }
  getUserType(){
  return localStorage.getItem('userType');  
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
