# Sudoku Validator

A web application built with Angular that allows users to input and validate Sudoku puzzles according to standard Sudoku rules.

## Features

- Interactive 9x9 Sudoku grid for number input
- Validation of rows, columns, and 3x3 subgrids for duplicate numbers
- Clear visual feedback of validation results
- Reset functionality
- Responsive design that works on mobile and desktop

## Architecture

This application is built with modern Angular features:

- **Standalone Components**: Uses Angular's standalone component architecture
- **Signal-based State Management**: Leverages Angular's signals API for reactive state management
- **OnPush Change Detection**: Implemented for performance optimization
- **Reactive Forms**: For efficient form handling and validation
- **Modern Angular Syntax**: Uses new control flow syntax (`@for`, `@if`) for cleaner template code

## Development Decisions

- Validation occurs on button click rather than real-time to avoid unnecessary calculations
- Invalid cells are highlighted for clear visual feedback
- The grid is styled to clearly distinguish the 3x3 subgrids
- Form controls with validation ensure only numbers 1-9 can be entered

## Running the Application

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sudoku-validator.git
cd sudoku-validator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## Building for Production

To build the application for production, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
