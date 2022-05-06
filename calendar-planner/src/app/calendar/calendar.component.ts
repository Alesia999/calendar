import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DateService } from './../date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  @Output() selected = new EventEmitter();

  chosen: any;

  calendar = [];

  date = new Date();

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.generate();
  }

  select(value: Date) {
    this.selected.emit(value);
    this.chosen = value;
    this.dateService.setDate(value);
  }

  generate() {
    let calendar: any = [];
    let separator = 0;
    calendar.push({
      weeks: Array(6)
        .fill(0)
        .map(() => {
          let daysSlice = this.dateService
            .getAllDays()
            .slice(separator, separator + 7);
          separator += 7;
          return daysSlice;
        }),
    });
    this.calendar = calendar[0].weeks;
    console.log(calendar);
  }

  isSameMonth(date: Date) {
    return date.getMonth() === this.date.getMonth();
  }

  isSameDate(date: Date) {
    let now = new Date();
    return (
      date.getDate() === now.getDate() && date.getMonth() === now.getMonth()
    );
  }

  isChosen(item: Date) {
    if (!this.isSameMonth(item)) return;
    return item === this.chosen;
  }

  switchToNextMonth() {
    this.dateService.incrementMonth(1);
    this.dateService.getDate().subscribe((date) => (this.date = date));
    this.generate();
  }

  switchToPrevMonth() {
    this.dateService.incrementMonth(-1);
    this.dateService.getDate().subscribe((date) => (this.date = date));
    this.generate();
  }
}
