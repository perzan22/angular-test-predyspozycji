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
export class MainPanelComponent {

}
