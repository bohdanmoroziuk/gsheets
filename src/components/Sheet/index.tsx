import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import SheetSizeState from 'store/SheetSizeState';
import Cell, { CELL_WIDTH, CELL_HEIGHT } from 'components/Cell';
import Row from 'components/Row';
import Column from 'components/Column';
import Resizer from 'components/Resizer';
import classes from 'components/Sheet/styles.module.css';

const Sheet: FC = () => {
  const sheetSize = useRecoilValue(SheetSizeState);

  const numberOfRows = Math.ceil(sheetSize.height / CELL_HEIGHT);
  const numberOfColumns = Math.ceil(sheetSize.width / CELL_WIDTH);

  return (
    <div className={classes.wrapper}>
      <table className={classes.sheet}>
        <tbody>
          {[...Array(numberOfRows)].map((row, rowIndex) => (
            <Row key={rowIndex}>
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
