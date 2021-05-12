import { selector } from 'recoil';
import { evaluate } from 'mathjs';

import { memoize } from 'store/utils';
import CellValueState from 'store/CellValueState';

const EvaluatedCellValueState = (id: string) => 
  memoize(
    `evaluated_cell_${id}`,
    () => selector({
      key: `evaluated_cell_${id}`,
      get: ({ get }) => {
        const value = get(CellValueState(id)) as string;

        if (value.startsWith('=')) {
          try {
            return evaluate(value.slice(1));
          } catch {
            return value;
          }
        }

        return value;
      },
    })
  );

export default EvaluatedCellValueState;
