import { selector } from 'recoil';
import { evaluate } from 'mathjs';

import CellValueState from 'store/CellValueState';
import { memoize, getEquationExpression } from 'store/utils';

const EvaluatedCellValueState = (id: string) => 
  memoize(
    `evaluated_cell_${id}`,
    () => selector({
      key: `evaluated_cell_${id}`,
      get: ({ get }) => {
        const value = get(CellValueState(id)) as string;

        if (value.startsWith('=')) {
          try {
            const expression = getEquationExpression(get, value.slice(1));

            if (expression === '!ERROR') {
              return expression;
            }

            return evaluate(expression);
          } catch (error) {
            return value;
          }
        }

        return value;
      },
    })
  );

export default EvaluatedCellValueState;
