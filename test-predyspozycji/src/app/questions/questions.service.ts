import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/api/answers'
  private questions: Question[] = []
  private questionSubs = new Subject<{ questions: Question[] }>

  constructor(private http: HttpClient) { }

  sendAnswer(answer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, { answer });
  }

  getResults(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/results`)
  }

  getQuestions() {
    this.http.get<{ questions: any, message: string }>(`http://localhost:3000/api/questions/`).subscribe({
      next: fetchedQuestions => {
        this.questions = fetchedQuestions.questions;
        this.questionSubs.next({ questions: [...this.questions] })
        console.log(fetchedQuestions.message)
      }
    })
  }

  getQuestionUpdateListener() {
    return this.questionSubs.asObservable()
}
}
