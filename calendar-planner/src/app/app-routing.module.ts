import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksFormComponent } from './tasks-form/tasks-form.component';

const routes: Routes = [{ path: 'form/:date', component: TasksFormComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
