import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnInit, Output} from '@angular/core';
import {DateTime} from 'luxon';
import {isValidDate, isValidForMax, isValidForMin} from '../util/date.util';

@Component({
  selector: 'tw-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Output() change = new EventEmitter<string>();
  @Output() calendarMonthChange = new EventEmitter<string>();
  @Output() calendarYearChange = new EventEmitter<string>();
  @Input() value: string;
  @Input() minDate;
  @Input() maxDate;

  calendarCells: CellMetadata[] = [];
  weekdayLabels: string[];
  navigationDate: DateTime;

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.initializeDaysOfWeek();
    this.refreshNavigationDate();
  }

  ngOnChanges(): void {
    this.refreshNavigationDate();
  }

  changeMonth(num: number): void {
    this.updateNavigationDate(this.navigationDate.plus({months: num}));
    this.calendarMonthChange.emit(this.navigationDate);
  }

  changeYear(num: number): void {
    this.updateNavigationDate(this.navigationDate.plus({years: num}));
    this.calendarYearChange.emit(this.navigationDate);
  }

  selectDate(cell: CellMetadata): void {
    if (!cell.disabled && cell.isoDate) {
      this.value = cell.isoDate;
      this.change.emit(this.value);
    }
  }

  get navigationYearLabel(): string {
    return this.navigationDate.setLocale(this.locale).toFormat('yyyy');
  }

  get navigationMonthLabel(): string {
    return this.navigationDate.setLocale(this.locale).toFormat('MMM');
  }

  private initializeDaysOfWeek(): void {
    this.weekdayLabels = [0, 1, 2, 3, 4, 5, 6].map(i => DateTime.local().set({weekday: i}).setLocale(this.locale).toFormat('ccc'));
  }

  private refreshNavigationDate(): void {
    const currentDate = DateTime.local();
    let nextNavigationDate = currentDate;

    if (this.value) {
      if (isValidDate(this.value)) {
        nextNavigationDate = DateTime.fromISO(this.value).startOf('month');
      }
    } else {
      if (this.maxDate && this.maxDate < currentDate.toISODate()) {
        nextNavigationDate = DateTime.fromISO(this.maxDate).startOf('month');
      } else if (this.minDate && this.minDate > currentDate.toISODate()) {
        nextNavigationDate = DateTime.fromISO(this.minDate).startOf('month');
      } else {
        nextNavigationDate = currentDate.startOf('month');
      }
    }
    this.updateNavigationDate(nextNavigationDate);
  }

  private updateNavigationDate(value: DateTime): void {
    this.navigationDate = value;
    this.refreshCells();
  }

  private refreshCells(): void {
    const firstDay = this.navigationDate.startOf('month');
    const lastDay = this.navigationDate.endOf('month');
    const daysInMonth = lastDay.get('day');
    const firstEmptyCells = firstDay.get('weekday') % 7;
    const lastEmptyCells = 6 - lastDay.get('weekday') < 0 ? 0 : 6 - lastDay.get('weekday');

    const dayOfMonthCells = this.createNCells(daysInMonth, i => {
      const dayIndex = i + 1;
      const isoDate = this.navigationDate.set({day: dayIndex}).toISODate();
      return {
        isoDate: isoDate,
        day: dayIndex,
        today: isoDate === DateTime.local().toISODate(),
        disabled: (this.maxDate && !isValidForMax(isoDate, this.maxDate)) ||
          (this.minDate && !isValidForMin(isoDate, this.minDate))
      } as CellMetadata;
    });

    this.calendarCells = this.createNEmptyCells(firstEmptyCells)
      .concat(dayOfMonthCells)
      .concat(this.createNEmptyCells(lastEmptyCells));
  }

  private createNCells(numberOfCells: number, cellMapper: (index: number) => CellMetadata): CellMetadata[] {
    return !numberOfCells ? [] : [...Array(numberOfCells)].map((_, i) => cellMapper(i));
  }

  private createNEmptyCells(numberOfCells: number): CellMetadata[] {
    return this.createNCells(numberOfCells, () => {
      return {
        disabled: true
      } as CellMetadata;
    });
  }
}

export class CellMetadata {
  isoDate: string;
  day: number;
  today: boolean;
  disabled: boolean;
}
