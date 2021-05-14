const table = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9 };

export const getRow = row => {
  let checkRow = row;

  if (/[A-Z]/.test(row)) checkRow = row.toLowerCase();

  return table[checkRow] ? table[checkRow] : checkRow;
};
