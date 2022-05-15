export const OmitClass = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () =>
  Omit<T, typeof keys[number]> => Class;
