import { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CellValueState from 'store/CellValueState';
import EvaluatedCellValueState from 'store/EvaluatedCellValueState';
import classes from 'components/Cell/styles.module.css';

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

interface CellProps {
  cellId: string;
}

const Cell: FC<CellProps> = ({ cellId }) => {
  const [cellValue, setCellValue] = useRecoilState<string | undefined>(CellValueState(cellId)); 
  const evaluatedCellValue = useRecoilValue<string>(EvaluatedCellValueState(cellId));

  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);

  const enableEditMode = () => {
    setIsEditMode(true);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const handleCellValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCellValue(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLInputElement;
      
      if (target.dataset?.cellId !== cellId) {
        disableEditMode();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [cellId]);

  return (
    isEditMode ? (
      <input
        className={classes.input}
        type="text" 
        ref={inputRef} 
        data-cell-id={cellId} 
        value={cellValue}
        onChange={handleCellValueChange}
      />
    ) : (
      <p  
        className={classes.label}
        data-cell-id={cellId} 
        onClick={enableEditMode}
      >
        {evaluatedCellValue}
      </p>
    ) 
  );
};

export default Cell;
