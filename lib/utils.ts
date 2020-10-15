export const clamp: (a: number, b: number, c: number) => number = (a, b, c) => {
  return Math.max(b, Math.min(a, c));
};

export default {
  clamp,
};
