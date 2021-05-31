import { cellIdToMatrixIndices } from 'utils';
import CellValueState from 'store/CellValueState';

const cache = new Map();

export const memoize = (id: string, atomFactory: Function) => {
  if (cache.has(id)) {
    return cache.get(id);
  }

  cache.set(id, atomFactory());

  return cache.get(id);
};

export const getEquationExpression = (
  getState: any,
  expression: any,
  notAllowedCellsIds: string[] = []
) => {
  const filterFoundCells = notAllowedCellsIds.filter((cellId) =>
    expression.includes(cellId)
  );

  if (filterFoundCells.length) {
    return '!ERROR';
  }

  const cellValues = [...Array.from(expression.matchAll(/[A-Z]+[0-9]+/gi))]
    .map((regexpOutput: any) => regexpOutput[0])
    .map((cellId: string) => {
      const { row, column } = cellIdToMatrixIndices(cellId);

      let value = '';

      try {
        value = getState(CellValueState(`${row}:${column}`)) || 0;

        if (value.startsWith('=')) {
          notAllowedCellsIds.push(cellId);
          value = getEquationExpression(
            getState,
            value.slice(1),
            notAllowedCellsIds
          );
        }
      } catch (error) {
        throw error;
      }

      return {
        cellId,
        value,
      };
    });

  const evaluatedExpression = cellValues.reduce(
    (finalExpression, cellValue) =>
      finalExpression.replaceAll(cellValue.cellId, cellValue.value.toString()),
    expression
  );

  return `(${evaluatedExpression})`;
};