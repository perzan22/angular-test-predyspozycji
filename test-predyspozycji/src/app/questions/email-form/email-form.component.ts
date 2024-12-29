import { Component } from '@angular/core';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.sass'
})
export class EmailFormComponent {

  results: any

  constructor(private answerService: AnswerService) {}

  getResults() {
    console.log('Działa')
    this.answerService.getResults().subscribe(response => {
      this.results = response.answers
    })
  }

}
