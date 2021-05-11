import { FC } from 'react';

import classes from 'components/Column/styles.module.css';

const Column: FC = ({ children }) => (
  <td className={classes.column}>
    {children}
  </td>
);

export default Column;
