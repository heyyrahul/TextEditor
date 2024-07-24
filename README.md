# Font Selector and Text Editor React Component

This project implements a font selector and text editor component in React. It allows users to choose from a selection of fonts and font weights, toggle italic styles, and edit text within a textarea.

## Features

- **Font Selection:** Choose from a variety of fonts loaded dynamically from a JSON file.
- **Weight Selection:** Select different font weights available for each fonts.
- **Italic Toggle:** Toggle between normal and italic font styles.
- **Text Editing:** Edit text within a textarea that dynamically applies selected font and style.
- **Data Persistence:** Save and reset text and font settings using local storage.

1. **Install the Project:**
   Clone and install the project's dependencies:
   ```bash
   git clone https://github.com/heyyrahul/TextEditor.git

   npm install

   npm start

4. **Open the application in your browser:**

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Font Selection:**
- Choose a font from the dropdown list labeled "Select Font."

2. **Weight Selection:**
- After selecting a font, choose a font weight from the dropdown list labeled "Select Weight."

3. **Italic Toggle:**
- If available for the selected font and weight, toggle the italic style using the checkbox labeled "Italic."

4. **Text Editing:**
- Edit text within the textarea. Changes will reflect the selected font, weight, and italic style.

5. **Save and Reset:**
- Use the "Save" button to persist current text and font settings to local-storage.
- Use the "Reset" button to clear text and reset font settings to defaults.

## Dependencies

- `react`: v17.0.2
- `react-dom`: v17.0.2
- `react-toastify`: v8.1.0

## Project Structure

- `src/`: Contains source code files.
- `components/`: React components.
- `Assets/`: Contains JSON file (`punt-frontend-assignment.json`) with font details.
- `CSS/`: Contains stylesheets (`Home.css` for component styling).
- `App.js`: Main application component.
- `index.js`: Entry point of the application.


