import { Component } from '@angular/core';
import { QuestionService } from '../../../questions/questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../../../questions/question.model';
import { Answer } from '../../../questions/answer.model';

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrl: './question-select.component.sass'
})
export class QuestionSelectComponent {

  questions: Question[] = []
  answers: Answer[] = []
  questionSeleceted!: Question | undefined
    
  private questionsSubs!: Subscription
  private answersSubs!: Subscription

  constructor(private questionService: QuestionService) {}


  ngOnInit(): void {
    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {
        this.questions = questionData.questions
      }
    })
  }


}
