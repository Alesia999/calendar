import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const DAY_MS = 60 * 60 * 24 * 1000;

@Injectable({
  providedIn: 'root',
})
export class DateService {
  todayDate: Date = new Date();

  dateValue: Date = new Date(
    this.todayDate.getFullYear(),
    this.todayDate.getMonth()
  );

  incrementMonth(delta: number): void {
    this.dateValue = new Date(
      this.dateValue.getFullYear(),
      this.dateValue.getMonth() + delta
    );
  }

  getDate(): Observable<Date> {
    const date = of(this.dateValue);
    return date;
  }

  getCalendarStartDay(date = this.dateValue) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();
    return [...Array(8).keys()]
      .slice(1)
      .map((num) => new Date(firstDayOfMonth - DAY_MS * num))
      .find((dt) => dt.getDay() === 1);
  }

  getAllDays() {
    const calStartTime = this.getCalendarStartDay()?.getTime();
    return [...Array(42).keys()].map(
      (num) => new Date(calStartTime! + DAY_MS * num)
    );
  }
}
