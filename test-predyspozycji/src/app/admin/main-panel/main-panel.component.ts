import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../questions/questions.service';
import { Question } from '../../questions/question.model';
import { Answer } from '../../questions/answer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.sass'
})
export class MainPanelComponent implements OnInit {

  selected: string = 'pytania'

  questions: Question[] = []
  answers: Answer[] = []
    
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
    this.questionService.getAllAnswers();
    this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
      next: answerData => {
        this.answers = answerData.answers
      }
    })
  }


  changeView(view: string) {
    this.selected = view
  }

  


}
