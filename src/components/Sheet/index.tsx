import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import SheetSizeState from 'store/SheetSizeState';
import Cell, { CELL_WIDTH, CELL_HEIGHT } from 'components/Cell';
import AxisCell from 'components/AxisCell';
import Row from 'components/Row';
import Column from 'components/Column';
import Resizer from 'components/Resizer';
import classes from 'components/Sheet/styles.module.css';
import { numberToChar } from 'utils';

const Sheet: FC = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfRows = Math.ceil(sheetSize.height / CELL_HEIGHT);
  const numberOfColumns = Math.ceil(sheetSize.width / CELL_WIDTH);

  return (
    <div className={classes.wrapper}>
      <table className={classes.sheet}>
        <tbody>
          <Row>
            {[...Array(numberOfColumns + 1)].map((column, columnIndex) => (
              <AxisCell key={columnIndex}>
                {columnIndex === 0 ? '' : numberToChar(columnIndex - 1)}
              </AxisCell>
            ))}
          </Row>
          {[...Array(numberOfRows)].map((row, rowIndex) => (
            <Row key={rowIndex}>
              <AxisCell>{rowIndex + 1}</AxisCell>
              {[...Array(numberOfColumns)].map((column, columnIndex) => (
                <Column key={columnIndex}>
                  <Cell cellId={`${rowIndex}:${columnIndex}`} />
                </Column>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
      <Resizer />
    </div>
  );
};

export default Sheet;
