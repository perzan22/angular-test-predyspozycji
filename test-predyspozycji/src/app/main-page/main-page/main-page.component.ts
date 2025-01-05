import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../questions/questions.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent {

  constructor(private router: Router, private questionService: QuestionService) {}

  startTest() {
    this.router.navigate(['/test'])
    this.questionService.resetAnswers();
  }
}
