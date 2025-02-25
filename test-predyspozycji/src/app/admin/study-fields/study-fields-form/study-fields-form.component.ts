import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudyFieldsService } from '../../../study-fields/study-fields.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudyField } from '../../../study-fields/study-field.model';

@Component({
  selector: 'app-study-fields-form',
  templateUrl: './study-fields-form.component.html',
  styleUrl: './study-fields-form.component.sass'
})
export class StudyFieldsFormComponent implements OnInit {

  form!: FormGroup
  mode: string = 'create'
  studyFieldID!: string | null
  studyField!: StudyField
  fieldOfStudyPoint!: { x: number, y: number }
  dataLoaded: boolean = false;

  constructor(private studyFieldsService: StudyFieldsService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.form = new FormGroup({
      "nazwa": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "wydzial": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      })
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.studyFieldID = paramMap.get('id')
        if (this.studyFieldID) {
          this.studyFieldsService.getStudyField(+this.studyFieldID).subscribe(studyFieldData => {
            this.studyField = {
              id_kierunku: studyFieldData.id_kierunku,
              nazwa: studyFieldData.nazwa,
              wydzial: studyFieldData.wydzial,
              x: studyFieldData.x,
              y: studyFieldData.y
            }

            this.fieldOfStudyPoint = { x: this.studyField.x, y: this.studyField.y };
            
            
            this.form.setValue({ 'nazwa': this.studyField.nazwa, 'wydzial': this.studyField.wydzial })
            this.dataLoaded = true;
          })
        }
      } else {
        this.mode = 'create'
        this.dataLoaded = true;
      }
    })
  }

  onSubmit() {
    if (this.mode == 'create') {
      this.addStudyField();
    } else {
      this.editStudyField();
    }
  }

  addStudyField() {
    if (this.form.invalid) {
      return
    }
    this.studyFieldsService.addStudyField(this.form.value.nazwa, this.form.value.wydzial, this.fieldOfStudyPoint.x, this.fieldOfStudyPoint.y);
  }

  editStudyField() {
    if (this.form.invalid) {
      return
    }
    if (this.studyFieldID) {
      this.studyFieldsService.editStudyField(this.form.value.nazwa, this.form.value.wydzial, this.fieldOfStudyPoint.x, this.fieldOfStudyPoint.y, +this.studyFieldID);
    }
  }

  onPointUpdate(updatedPoint: { x: number, y: number }) {
    this.fieldOfStudyPoint = updatedPoint;
  }
}
