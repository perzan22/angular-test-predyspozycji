import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { SelectQuestionComponent } from './questions/select-question/select-question.component';
import { EmailFormComponent } from './questions/email-form/email-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './admin/auth/login/login.component';
import { MainPanelComponent } from './admin/main-panel/main-panel.component';
import { QuestionSelectComponent } from './admin/questions/question-select/question-select.component';
import { QuestionFormComponent } from './admin/questions/question-form/question-form.component';
import { StudyFieldsSelectComponent } from './admin/study-fields/study-fields-select/study-fields-select.component';
import { StudyFieldsFormComponent } from './admin/study-fields/study-fields-form/study-fields-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    SelectQuestionComponent,
    EmailFormComponent,
    LoginComponent,
    MainPanelComponent,
    QuestionSelectComponent,
    QuestionFormComponent,
    StudyFieldsSelectComponent,
    StudyFieldsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
