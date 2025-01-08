import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionService } from '../../../questions/questions.service';
import { Question } from '../../../questions/question.model';
import { Answer } from '../../../questions/answer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.sass'
})
export class QuestionFormComponent implements OnInit {

  form!: FormGroup
  mode: string = 'create'
  questionID!: string | null
  question!: Question
  answers: Answer[] = []
  answerSubs!: Subscription

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

  get odpowiedzi(): FormArray {
    return this.form.get('odpowiedzi') as FormArray;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      "tresc_pytania": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "instrukcja": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "typ_pytania": new FormControl(null, {
        validators: [Validators.required]
      }),
      "odpowiedzi": new FormArray([])
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.questionID = paramMap.get('id')
        if (this.questionID) {
          this.questionService.getQuestion(+this.questionID).subscribe(questionData => {
            this.question = {
              id_pytania: questionData.id_pytania,
              tresc: questionData.tresc,
              instrukcja: questionData.instrukcja,
              ilosc_odpowiedzi: questionData.ilosc_odpowiedzi,
              typ: questionData.id_typu
            }
            
            this.form.patchValue({ 'tresc_pytania': this.question.tresc, 'instrukcja': this.question.instrukcja, 'typ_pytania': this.question.typ.toString() })
          })
          this.questionService.getAnswers(+this.questionID)
          this.answerSubs = this.questionService.getAnswerUpdateListener().subscribe({
            next: answersData => {
              answersData.answers.forEach(answer => {
                const answerGroup = new FormGroup({
                  "tresc_odpowiedzi": new FormControl(answer.tresc, [Validators.required, Validators.maxLength(60)]),
                  "wartosc": new FormControl(answer.wartosc_punktowa, [Validators.required])
                });
                this.odpowiedzi.push(answerGroup)
              })
            }
          })
        }
      } else {
        this.mode = 'create'
      }
    })
  }

  addAnswer() {
    const answerGroup = new FormGroup({
      "tresc_odpowiedzi": new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      "wartosc": new FormControl(null, [Validators.required])
    })
    this.odpowiedzi.push(answerGroup)
  }



}
