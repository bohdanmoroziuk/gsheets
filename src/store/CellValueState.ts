import { atom } from 'recoil';

import { memoize } from 'store/utils';

const CellValueState = (id: string) => 
  memoize(
    id, 
    () => atom({
      key: `cell_${id}`,
      default: '',
    })
  );

export default CellValueState;
