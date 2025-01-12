import { Component } from '@angular/core';
import { StudyField } from '../../../study-fields/study-field.model';
import { filter, Subscription } from 'rxjs';
import { StudyFieldsService } from '../../../study-fields/study-fields.service';

@Component({
  selector: 'app-study-fields-select',
  templateUrl: './study-fields-select.component.html',
  styleUrl: './study-fields-select.component.sass'
})
export class StudyFieldsSelectComponent {

  studyFields: StudyField[] = []
  private studyFieldsSubs!: Subscription

  constructor(private studyFieldsService: StudyFieldsService) {}


  ngOnInit(): void {
    this.studyFieldsService.getStudyFields();
    this.studyFieldsSubs = this.studyFieldsService.getStudyFieldsUpdateListener().subscribe({
      next: studyFieldsData => {
        this.studyFields = studyFieldsData.studyFields
      }
    })
  }
  
  deleteStudyField(studyFieldID: number) {
    this.studyFieldsService.deleteStudyField(studyFieldID).subscribe({
      next: () => {
        this.studyFields = this.studyFields.filter(field => field.id_kierunku !== studyFieldID)
      },
      error: error => {
        console.error(error.message)
      }
    })
  }

}
