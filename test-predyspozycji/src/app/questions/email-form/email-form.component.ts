import { Component } from '@angular/core';
import { QuestionService } from '../questions.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.sass'
})
export class EmailFormComponent {

  kierunek!: string

  constructor(private questionService: QuestionService) {}

  getResults() {
    console.log('Działa')
    this.questionService.getResults().subscribe(response => {
      this.kierunek = response.kierunek
    })
  }

}
