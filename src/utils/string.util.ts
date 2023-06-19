import { lowerCase, trim } from 'lodash';
import numeral from 'numeral';

export class StringUtility {
  static isEnabled(env: string): boolean {
    const value = ['1', 'true', 'yes', 'on'];
    return value.includes(lowerCase(trim(env)));
  }

  static toNum(str: string): number {
    return numeral(str).value();
  }

  static isValidUsername(str: string): boolean {
    return !/[^0-9a-z@._-]+/gi.test(str);
  }
}
