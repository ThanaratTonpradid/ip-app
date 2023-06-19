import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class PasswordUtility {
  static genPassword(rawPassword: string): string {
    return hashSync(rawPassword, genSaltSync());
  }

  static isValidPassword(rawPassword: string, hashPassword: string): boolean {
    return compareSync(rawPassword, hashPassword);
  }

  static genHash(): string {
    return PasswordUtility.genPassword(`${new Date().getTime()}`);
  }
}
