import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';
import { Answer } from '../answer.model';


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.sass'
})
export class SelectQuestionComponent implements OnInit {
  questions: Question[] = []

  answers: Answer[] = []
  
  private questionsSubs!: Subscription
  private answersSubs!: Subscription


  currentQuestionIndex: number = 0;


  constructor(private router: Router, private questionService: QuestionService) {}

  
  ngOnInit(): void {
    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {
        this.questions = questionData.questions
        this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
        this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
          next: answerData => {
            this.answers = answerData.answers
          }
        })
      }
    })
  }
  

  nextQuestion(answer: string) {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.questionService.sendAnswer(answer).subscribe(response => {
        console.log('Zapisano: ', response)
      })
      this.currentQuestionIndex++;
      this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
      this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
        next: answerData => {
          this.answers = answerData.answers
        }
      })
      console.log(this.currentQuestionIndex + " " + this.questions.length)
    } else {
      this.questionService.sendAnswer(answer).subscribe(response => {
        console.log('Zapisano: ', response)
      })
      this.currentQuestionIndex++;
      console.log(answer)
      console.log('Koniec')
      this.router.navigate(['/poznaj-wynik'])
    }
  }

  getLetter(index: number): string {
    const letters = 'ABCD';
    return letters[index % letters.length]
  }

}
