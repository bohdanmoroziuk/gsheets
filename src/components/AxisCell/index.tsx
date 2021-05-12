import { FC } from 'react'

import classes from 'components/AxisCell/styles.module.css';

const AxisCell: FC = ({ children }) => {
  return (
    <th
      className={classes['axis-cell']}
    >
      {children}
    </th>
  )
};

export default AxisCell;

