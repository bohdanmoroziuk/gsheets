import { atom } from 'recoil';

const cache = new Map();

export const memoize = (id: string, atomFactory: Function) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  cache.set(id, atomFactory());

  return cache.get(id);
}; 

const CellValueState = (id: string) => 
  memoize(
    id, 
    () => atom({
      key: `cell_${id}`,
      default: '',
    })
  );

export default CellValueState;
