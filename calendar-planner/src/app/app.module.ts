import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,    
    TasksFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
