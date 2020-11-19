import {DateTime} from 'luxon';

export function formatDate(dateString: string): string {
  return !dateString ? '' : dateString
    .match(/\d*/g).join('')
    .match(/(\d{0,4})(\d{0,2})(\d{0,2})/).slice(1).join('-')
    .replace(/-*$/g, '');
}

export function isValidDate(isoDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate).isValid;
}

export function isValidForMin(isoDate: string, minDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate) >= DateTime.fromISO(minDate);
}

export function isValidForMax(isoDate: string, maxDate: string): boolean {
  return !isoDate ? true : DateTime.fromISO(isoDate) < DateTime.fromISO(maxDate);
}
