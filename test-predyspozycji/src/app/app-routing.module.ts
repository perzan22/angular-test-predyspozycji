import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { SelectQuestionComponent } from './questions/select-question/select-question.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'test', component: SelectQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
