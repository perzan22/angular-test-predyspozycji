import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
    return this.http.get<{ kierunek: number, wynik: number }>(`http://localhost:3000/api/results/`)
  }

  addResult(id_kandydata: number, id_kierunku: number, wynik: number) {

    const resultData = {
      id_kandydata: id_kandydata,
      id_kierunku: id_kierunku,
      wynik: wynik
    }

    return this.http.post<{ message: string, wynik_testu: number }>(`http://localhost:3000/api/results/`, resultData)

  }
}


