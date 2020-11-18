import {DateTime} from 'luxon';

export function isValidDate(isoDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate).isValid;
}

export function isValidForMin(isoDate: string, minDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate) >= DateTime.fromISO(minDate);
}

export function isValidForMax(isoDate: string, maxDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate) < DateTime.fromISO(maxDate);
}
