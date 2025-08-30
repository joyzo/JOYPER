export const logger = {
  info: (...args: unknown[]) => console.log('ai:', ...args),
  error: (...args: unknown[]) => console.error('ai:', ...args),
};
