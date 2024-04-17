/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEBOUNCE_DELAY } from '../constants/constants';

export const debounce = <T extends (...args: any[]) => any>(callback: T) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, DEBOUNCE_DELAY);
    return result;
  };
};
