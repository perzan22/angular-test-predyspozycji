import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.sass'
})
export class SelectQuestionComponent implements OnInit {
  questions: Question[] = []

  answers = [
    ['Odpowiedź 1', 'Odpowiedź 2', 'Odpowiedź 3'],
    ['Odpowiedź 1', 'Odpowiedź 2'],
    ['Odpowiedź 1', 'Odpowiedź 2']
  ]
  
  private questionsSubs!: Subscription

  currentQuestionIndex: number = 0;


  constructor(private router: Router, private questionService: QuestionService) {}

  
  ngOnInit(): void {
    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {
        this.questions = questionData.questions
      }
    })
  }
  

  nextQuestion(answer: string) {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.questionService.sendAnswer(answer).subscribe(response => {
        console.log('Zapisano: ', response)
      })
      this.currentQuestionIndex++;
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
