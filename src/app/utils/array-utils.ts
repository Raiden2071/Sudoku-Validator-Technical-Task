export function createSudokuVector<T>(size: number, defaultValue: T): T[] {
  return Array(size).fill(defaultValue);
}

export function createEmptySudokuGrid(): (number | null)[][] {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
}
