import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { SelectQuestionComponent } from './questions/select-question/select-question.component';
import { EmailFormComponent } from './questions/email-form/email-form.component';
import { MainPanelComponent } from './admin/main-panel/main-panel.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'test', component: SelectQuestionComponent },
  { path: 'poznaj-wynik', component: EmailFormComponent },
  { path: 'admin', component: MainPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
