import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from './candidate.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private apiURL = 'http://localhost:3000/api/candidates'
  private candidates: Candidate[] = []
  private candidatesSubs = new Subject<{ candidates: Candidate[] }>

  constructor(private http: HttpClient) { }

  createCandidate(imie: string, nazwisko: string, email: string, miasto: string) {

    const candidateData = {
      imie: imie,
      nazwisko: nazwisko,
      email: email,
      miasto: miasto
    }

    return this.http.post<{ message: string, id_kandydata: number }>(`${this.apiURL}`, candidateData);

  }

  getCandidates() {
    this.http.get<{ candidates: any, message: string }>(`http://localhost:3000/api/candidates/`).subscribe({
      next: fetchedCandidates => {
        this.candidates = fetchedCandidates.candidates;
        this.candidatesSubs.next({ candidates: [...this.candidates] })
      }
    })
  }

  deleteCandidate(id_kandydata: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/candidates/?id_kandydata=${id_kandydata}`);
  }

  getCandidatesUpdateListener() {
    return this.candidatesSubs.asObservable();
  }

}
