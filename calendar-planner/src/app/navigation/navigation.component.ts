import { Component, OnInit } from '@angular/core';
import { DateService } from './../date.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  todayDate: Date = new Date();

  constructor(private dateService: DateService) {}

  ngOnInit(): void {}

  switchToNextMonth() {
    this.dateService.incrementMonth(1);
    this.dateService.getDate().subscribe((date) => (this.todayDate = date));
  }

  switchToPrevMonth() {
    this.dateService.incrementMonth(-1);
    this.dateService.getDate().subscribe((date) => (this.todayDate = date));
  }
}
