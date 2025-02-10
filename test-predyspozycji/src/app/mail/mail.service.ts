import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(imie: string, nazwisko: string, kierunek: string, email: string) {
    return this.http.post<{ message: string }>('http://localhost:3000/api/mail/', { imie, nazwisko, kierunek, email });
  }

}
