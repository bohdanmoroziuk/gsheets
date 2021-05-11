import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import SheetSizeState from 'store/SheetSizeState';
import Cell, { CELL_WIDTH, CELL_HEIGHT } from 'components/Cell';
import Row from 'components/Row';
import Column from 'components/Column';

const Sheet: FC = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfRows = sheetSize.height / CELL_HEIGHT;
  const numberOfColumns = sheetSize.width / CELL_WIDTH;

  return (
    <table>
      <tbody>
        {[...Array(numberOfRows)].map((row, rowIndex) => (
          <Row key={rowIndex}>
            {[...Array(numberOfColumns)].map((column, columnIndex) => (
              <Column key={columnIndex}>
                <Cell />
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
