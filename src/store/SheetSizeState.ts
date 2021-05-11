import { atom } from 'recoil';

const SheetSizeState = atom({
  key: 'sheetSize',
  default: {
    width: 600,
    height: 600,
  },
});

export default SheetSizeState;
