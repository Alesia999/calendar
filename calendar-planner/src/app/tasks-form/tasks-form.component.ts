import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../services/date.service';
import { Task, TasksService } from '../services/tasks.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss'],
})
export class TasksFormComponent implements OnInit, DoCheck {
  form!: FormGroup;

  tasks?: Task[];

  constructor(
    public dateService: DateService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  ngDoCheck(): void {
    this.dateService
      .getDate()
      .pipe(switchMap((value: Date) => this.tasksService.load(value)))
      .subscribe((tasks) => (this.tasks = tasks));
  }

  submit() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.dateValue.toDateString(),
    };
    this.tasksService.create(task);
    this.form.reset();
  }

  remove(task: Task) {
    this.tasksService.remove(task);
  }
}
