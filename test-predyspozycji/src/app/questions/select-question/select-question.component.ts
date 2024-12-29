import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from '../answer.service';

export interface Question {
  question: string;
  answers: string[];
}

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.sass'
})
export class SelectQuestionComponent {

  constructor(private router: Router, private answerService: AnswerService) {}

  questions: Question[] = [
    { question: 'Pytanie 1', answers: ['Odpowiedź 1', 'Odpowiedź 2', 'Odpowiedź 3', 'Odpowiedź 4'] },
    { question: 'Pytanie 2', answers: ['Odpowiedź 1', 'Odpowiedź 2', 'Odpowiedź 3', 'Odpowiedź 4'] },
    { question: 'Pytanie 3', answers: ['Odpowiedź 1', 'Odpowiedź 2', 'Odpowiedź 3', 'Odpowiedź 4'] },
    { question: 'Pytanie 4', answers: ['Odpowiedź 1', 'Odpowiedź 2', 'Odpowiedź 3', 'Odpowiedź 4'] },
  ];

  currentQuestionIndex: number = 0;

  nextQuestion(answer: string) {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.answerService.sendAnswer(answer).subscribe(response => {
        console.log('Zapisano: ', response)
      })
      this.currentQuestionIndex++;
      console.log(this.currentQuestionIndex + " " + this.questions.length)
    } else {
      this.answerService.sendAnswer(answer).subscribe(response => {
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
