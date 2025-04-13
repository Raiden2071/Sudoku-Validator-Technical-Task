export const FIRST_SUDOKU: (number | null)[][] = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9]
];

export const SECOND_SUDOKU: (number | null)[][] = [
  [null, null, null, 2, 6, null, 7, null, 1],
  [6, 8, null, null, 7, null, null, 9, null],
  [1, 9, null, null, null, 4, 5, null, null],
  [8, 2, null, 1, null, null, null, 4, null],
  [null, null, 4, 6, null, 2, 9, null, null],
  [null, 5, null, null, null, 3, null, 2, 8],
  [null, null, 9, 3, null, null, null, 7, 4],
  [null, 4, null, null, 5, null, null, 3, 6],
  [7, null, 3, null, 1, 8, null, null, null]
];

export const THIRD_PUZZLE: (number | null)[][] = [
  [null, 2, null, 6, null, 8, null, null, null],
  [5, 8, null, null, null, 9, 7, null, null],
  [null, null, null, null, 4, null, null, null, null],
  [3, 7, null, null, null, null, 5, null, null],
  [6, null, null, null, null, null, null, null, 4],
  [null, null, 8, null, null, null, null, 1, 3],
  [null, null, null, null, 2, null, null, null, null],
  [null, null, 9, 8, null, null, null, 3, 6],
  [null, null, null, 3, null, 6, null, 9, null]
];


export function getRandomPuzzle(): (number | null)[][] {
  const puzzles = [FIRST_SUDOKU, SECOND_SUDOKU, THIRD_PUZZLE];
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  
  return JSON.parse(JSON.stringify(puzzles[randomIndex]));
}
