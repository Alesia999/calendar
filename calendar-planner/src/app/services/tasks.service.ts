import { Injectable } from '@angular/core';
import { of, Observable, switchMap } from 'rxjs';
import { DateService } from './date.service';

export interface Task {
  title: string;
  date?: any;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks?: Task[];

  constructor(private dateService: DateService) {}

  create(task: Task) {
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('tasks') || '[]'),
        task,
      ])
    );
  }

  load(date: Date): Observable<any> {
    const key = date.toDateString();

    const data = localStorage.getItem('tasks');
    const tasks: Task[] = Array.from(JSON.parse(data!));
    const filtered: Task[] = tasks.filter((t) => t.date === key);

    this.tasks = filtered;
    return of(filtered);
  }

  remove(task: Task) {
    const data = localStorage.getItem('tasks');
    const tasks: Task[] = Array.from(JSON.parse(data!));
    const newTasks = tasks.filter(
      (t) => JSON.stringify(t) !== JSON.stringify(task)
    );
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
}
