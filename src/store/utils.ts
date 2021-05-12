const cache = new Map();

export const memoize = (id: string, atomFactory: Function) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  cache.set(id, atomFactory());

  return cache.get(id);
};
