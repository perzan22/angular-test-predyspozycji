import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiUrl = 'http://localhost:3000/api/answers'

  constructor(private http: HttpClient) { }

  sendAnswer(answer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, { answer });
  }

  getResults(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/results`)
  }
}
