import { atom } from 'recoil';

const CellValueState = atom({
  key: 'cell',
  default: '',
});

export default CellValueState;
