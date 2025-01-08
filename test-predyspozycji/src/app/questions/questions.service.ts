import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question.model';
import { Answer } from './answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:3000/api/answers'
  private questions: Question[] = []
  private questionSubs = new Subject<{ questions: Question[] }>
  private answers: Answer[] = []
  private answerSubs = new Subject<{ answers: Answer[] }>

  constructor(private http: HttpClient) { }

  sendAnswer(answer: Answer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, { answer });
  }

  getResults(): Observable<any> {
    return this.http.get<{ kierunek: string }>(`http://localhost:3000/api/results/`)
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

  getQuestion(id_pytania: number) {
    return this.http.get<{ id_pytania: number, tresc: string, instrukcja: string, ilosc_odpowiedzi: number, id_typu: number }>(`http://localhost:3000/api/questions/edit?id_pytania=${id_pytania}`)
  }

  getAllAnswers() {
    this.http.get<{ answers: any, message: string }>(`${this.apiUrl}/all/`).subscribe({
      next: fetchedAnswers => {
        this.answers = fetchedAnswers.answers;
        this.answerSubs.next({ answers: [...this.answers] })
      }
    })
  }

  getAnswers(id_pytania: number) {
    this.http.get<{ answers: any, message: string }>(`${this.apiUrl}?id_pytania=${id_pytania}`).subscribe({
      next: fetchedAnswers => {
        this.answers = fetchedAnswers.answers;
        this.answerSubs.next({ answers: [...this.answers] })
        console.log(fetchedAnswers.message)
      }
    })
  }

  resetAnswers() {
    this.http.get<{ message: string }>(`${this.apiUrl}/reset`).subscribe({
      next: result => {
        console.log(result.message)
      }
    })
  }

  getQuestionUpdateListener() {
    return this.questionSubs.asObservable()
  }

  getAnswerUpdateListener() {
    return this.answerSubs.asObservable()
  }
}
