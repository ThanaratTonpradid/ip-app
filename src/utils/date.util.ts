import { Dayjs } from 'dayjs';

export class DateTimeUtility {
  // Unixtime Milliseconds
  static getDayjsInstant(date: number): Dayjs {
    return new Dayjs(date);
  }

  static getDateTimeByFormat(
    date: number,
    format = 'DD/MM/YYYY HH:mm',
  ): string {
    return this.getDayjsInstant(date).format(format);
  }

  static getUnixtimeMilliseconds(): number {
    return this.getDayjsInstant(new Date().getTime()).unix();
  }
}
