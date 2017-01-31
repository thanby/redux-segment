export function warn(...args) {
  const ENV = typeof process !== 'undefined' && process.env.NODE_ENV || 'development';

  if (ENV === 'development' || ENV === 'test') {
    console.warn(...args);
  }
}