export class BaseDto<T> {
  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
