export const numberToChar = (value: number): string => {
  const division = Math.floor(value / 26);
  const reminder = Math.floor(value % 26);

  const char = String.fromCharCode(reminder + 97).toUpperCase();

  return division -1 >= 0 ? numberToChar(division - 1) + char : char;
};

export const charToNumber = (value: string): number => (
  value
    .split('')
    .reverse()
    .map((letter, index) => (
      index === 0
        ? letter.toLowerCase().charCodeAt(0) - 97
        : letter.toLowerCase().charCodeAt(0) - 97 + 1
    ))
    .map((base26Number, position) => base26Number * 26 ** position)
    .reduce((sum, value) => sum + value, 0)
);

export const cellIdToMatrixIndices = (value: string) => {
  const columnLetters = value.match(/[A-Z]+/)![0];
  const columnNumber = charToNumber(columnLetters);

  const rowNumber = parseInt(value.match(/[0-9]+/)![0], 10) - 1;

  return {
    column: columnNumber,
    row: rowNumber
  };
};