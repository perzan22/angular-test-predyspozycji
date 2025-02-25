import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultsService } from '../../results/results.service';
import { CandidatesService } from '../../candidates/candidates.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { MailService } from '../../mail/mail.service';
import { StudyFieldsService } from '../../study-fields/study-fields.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.sass'
})
export class EmailFormComponent implements OnInit {

  kierunek!: number
  form!: FormGroup
  wynik!: number

  constructor(private resultService: ResultsService, private candidateService: CandidatesService, private router: Router, private studyFieldsService: StudyFieldsService, private mailService: MailService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      "imie": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20), Validators.minLength(2)]
      }),
      "nazwisko": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30), Validators.minLength(1)]
      }),
      "email": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
      }),
      "miasto": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "zgoda-przetwarzania": new FormControl(false, {
        validators: [Validators.requiredTrue]
      }),
      "zgoda-marketing": new FormControl(false, {
        validators: [Validators.requiredTrue]
      })
    })
  }

  getResults() {

    if (this.form.invalid) {
      return
    }

    this.candidateService.createCandidate(this.form.value.imie, this.form.value.nazwisko, this.form.value.email, this.form.value.miasto).subscribe({
      next: response => {
        const id_kandydata = response.id_kandydata;
        this.resultService.getResults().subscribe(response => {

          console.log(response)
          this.kierunek = response.kierunek;
          this.wynik = response.wynik

          this.resultService.addResult(id_kandydata, this.kierunek, this.wynik).subscribe({
            next: response => {
              this.studyFieldsService.getStudyField(this.kierunek).subscribe({
                next: studyField => {
                  // this.mailService.sendMail(this.form.value.imie, this.form.value.nazwisko, studyField.nazwa, this.form.value.email).subscribe({
                  // //   next: () => {
                      this.router.navigate(['/'])
                    },
                    error: error => {
                      console.error(error);
                    }
                  // // })
                  
                //}
              })
              
            }
          })
        })
      }
    })

    
  }

}
