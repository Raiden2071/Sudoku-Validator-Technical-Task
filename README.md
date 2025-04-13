# Sudoku Validator

## How the Application Works

- Angular application starts with SudokuBoardComponent as main component
- The core logic for creating the 9x9 sudoku grid is stored in SudokuFormService. This service also contains the main logic related to creating empty or filled grids.

- Validation of fields and correctness of the completed sudoku is handled by the SudokuValidatorService. It checks whether the sudoku is valid, whether the fields are empty, and identifies incorrectly filled cells.
- The application is divided into small components to reduce coupling:
  - TimerComponent - calculates sudoku completion time and resets the timer when buttons are pressed
  - ValidationMessageComponent - displays a message indicating whether the sudoku is correctly completed after pressing the "Check" button
  - SudokuGridComponent - generates and displays the grid, checks and highlights incorrect cells
  - SudokuControlsComponent - displays buttons for interacting with the application

## Additional Features

- **New Game**: Loads a random sudoku puzzle from predefined templates of varying difficulty
- **Timer**: Tracks solving time, automatically stops when successfully completed, and resets when starting a new game
- **Reactive Architecture**: Uses Angular Signals for reactive UI updates when state changes
- **Form Validation**: Multi-level input validation with checks for duplicates in rows, columns, and 3×3 subgrids

## How to Run

```
npm install
ng serve OR npm run start
```

## Design Decisions

- Followed DRY (Don't Repeat Yourself) and SOLID principles to keep the code clean, maintainable, and scalable
- Separated responsibilities between components and services to prevent bloated components and ensure each file has a clear single responsibility
- Implemented OnPush change detection to improve performance
- Created utility functions to avoid code duplication
- Used standalone components, Signals, Dependency Injection, and Reactive Forms
- Applied SCSS variables for theming and consistent styling
