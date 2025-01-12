import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudyField } from './study-field.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudyFieldsService {

  studyFields: StudyField[] = []
  studyFieldsSubs = new Subject<{ studyFields: StudyField[] }>

  constructor(private http: HttpClient, private router: Router) { }

  getStudyFields() {
    this.http.get<{ studyFields: any, message: string }>(`http://localhost:3000/api/study-fields/`).subscribe({
      next: fetchedStudyFields => {
        this.studyFields = fetchedStudyFields.studyFields;
        this.studyFieldsSubs.next({ studyFields: [...this.studyFields] })
      }
    })
  }

  getStudyField(id_kierunku: number) {
    return this.http.get<{ id_kierunku: number, nazwa: string, wydzial: string, wartosc_punktowa: number }>(`http://localhost:3000/api/study-fields/edit?id_kierunku=${id_kierunku}`)
  }

  addStudyField(nazwa: string, wydzial: string, wartosc_punktowa: number) {
    const studyFieldData = {
      nazwa: nazwa,
      wydzial: wydzial,
      wartosc_punktowa: wartosc_punktowa
    }
    

    this.http.post<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields/`, studyFieldData).subscribe({
      next: createddStudyField => {
        console.log(createddStudyField.studyField);
        this.router.navigate(['/admin/kierunki'])
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  editStudyField(nazwa: string, wydzial: string, wartosc_punktowa: number, studyFieldID: number) {
    const studyFieldData = {
      nazwa: nazwa,
      wydzial: wydzial,
      wartosc_punktowa: wartosc_punktowa
    }
    

    this.http.patch<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields?id_kierunku=${studyFieldID}`, studyFieldData).subscribe({
      next: editedStudyField => {
        console.log(editedStudyField.studyField);
        this.router.navigate(['/admin/kierunki'])
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  getStudyFieldsUpdateListener() {
    return this.studyFieldsSubs.asObservable()
  }

  deleteStudyField(studyFieldID: number): Observable<any> {
    return this.http.delete<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields?id_kierunku=${studyFieldID}`)
  }
}
