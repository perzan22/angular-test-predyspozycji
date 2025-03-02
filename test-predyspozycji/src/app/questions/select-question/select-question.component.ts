import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';
import { Answer } from '../answer.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.sass'
})
export class SelectQuestionComponent implements OnInit {
  questions: Question[] = []

  answers: Answer[] = []
  candidateAnswers: Answer[] = [];
  
  private questionsSubs!: Subscription
  private answersSubs!: Subscription


  currentQuestionIndex: number = 0;


  constructor(private router: Router, private questionService: QuestionService, private snackBar: MatSnackBar) {}

  
  ngOnInit(): void {
    this.currentQuestionIndex = 0;
    this.candidateAnswers = [];
    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {
        this.questions = questionData.questions
        this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
        this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
          next: answerData => {
            this.answers = answerData.answers
          },
          error: error => {
            this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          }
        })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }
  

  nextQuestion(answer: Answer) {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.candidateAnswers.push(answer);
      this.currentQuestionIndex++;
      this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
      this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
        next: answerData => {
          this.answers = answerData.answers
        },
        error: error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
        }
      })
      console.log(this.currentQuestionIndex + " " + this.questions.length)
    } else {
      this.candidateAnswers.push(answer)
      this.currentQuestionIndex++;
      this.questionService.answersToResult = this.candidateAnswers;
      console.log(this.candidateAnswers)
      console.log('Koniec')
      this.router.navigate(['/poznaj-wynik'])
    }
  }

  getLetter(index: number): string {
    const letters = 'ABCD';
    return letters[index % letters.length]
  }

}
