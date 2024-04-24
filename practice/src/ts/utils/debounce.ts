/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEBOUNCE_DELAY } from '../constants/constants';

export const debounce = <T extends (...args: any[]) => any>(callback: T) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> | void => {
    let result: ReturnType<T> | void = void 0;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, DEBOUNCE_DELAY);
    return result;
  };
};
