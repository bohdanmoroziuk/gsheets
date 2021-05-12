import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import SheetSizeState from 'store/SheetSizeState';
import classes from 'components/Resizer/styles.module.css'; 
 
const Resizer: FC = () => {
  const setSheetSize = useSetRecoilState(SheetSizeState);

  const drag = (event: MouseEvent) => {
    setSheetSize({
      width: event.pageX,
      height: event.pageY,
    });
  };

  const startDrag = () => {
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  useEffect(() => {

  }, []);

  return (
    <div 
      className={classes.resizer} 
      onMouseDown={startDrag}  
    />
  )
};

export default Resizer;
