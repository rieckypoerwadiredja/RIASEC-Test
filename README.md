# RIASEC Test Application

This project is a RIASEC Test application built with React. The application helps users determine their interests and the suitability of various study fields based on the RIASEC model (Realistic, Investigative, Artistic, Social, Enterprising, and Conventional). The form submission is integrated with Google Sheets to save users' responses and results for further analysis.

## Features

- **RIASEC Interest Test**: Assesses user interests and recommends suitable study fields.
- **Integration with Google Sheets**: Saves responses to a specified Google Sheets document.
- **React and React Router**: Utilizes React for the UI and React Router for navigation.
- **Styled with Tailwind CSS**: Uses Tailwind CSS for responsive and clean design.
- **Code Quality with ESLint**: Ensures code quality and consistency across the project.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Dependencies](#dependencies)
4. [Development Dependencies](#development-dependencies)
5. [Form Setup](#form-setup)
6. [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/riasec-test.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and go to http://localhost:5173/ to view the application.
3. For production build:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Dependencies

- **react (^18.3.1)**: A JavaScript library for building user interfaces.
- **react-dom (^18.3.1)**: Serves as the entry point to the DOM and server renderers for React.
- **react-router (^6.27.0)**: Declarative routing for React applications.
- **react-router-dom (^6.27.0)**: Provides DOM bindings for React Router.

## Development Dependencies

- **@eslint/js (^9.13.0)**: JavaScript configuration for ESLint.
- **@types/react (^18.3.11)**: TypeScript definitions for React.
- **@types/react-dom (^18.3.1)**: TypeScript definitions for React DOM.
- **@vitejs/plugin-react-swc (^3.5.0)**: Vite plugin to support React with SWC compiler.
- **autoprefixer (^10.4.20)**: Adds vendor prefixes to CSS.
- **eslint (^9.13.0)**: Linting utility for JavaScript and JSX.
- **eslint-plugin-react (^7.37.1)**: React-specific linting rules for ESLint.
- **eslint-plugin-react-hooks (^5.0.0)**: Enforces rules for React Hooks.
- **eslint-plugin-react-refresh (^0.4.13)**: Helps with hot reloading of React components.
- **globals (^15.11.0)**: Global variables for various environments.
- **postcss (^8.4.47)**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss (^3.4.14)**: Utility-first CSS framework.
- **vite (^5.4.9)**: Next-generation frontend tooling for fast development.

## Form Setup

This project uses a form-to-Google-Sheets integration based on [jamiewilson/form-to-google-sheets](https://github.com/jamiewilson/form-to-google-sheets).

### Steps to Set Up Google Sheets Form Integration:

1. **Create a New Google Sheet**: Name it as per your requirement.

2. **Open Google Apps Script**:

   - Go to **Extensions > Apps Script** in your Google Sheet.
   - Copy and paste the Google Apps Script code provided in the original repository.

3. **Deploy as Web App**:

   - Click on **Deploy > Manage Deployments**.
   - Select **New Deployment** and configure it as a Web App.
   - Set **Anyone can access it**.
   - Copy the Web App URL as this will be your `scriptURL` in the project.

4. **Connect Form to Google Sheet**:
   - Set the `scriptURL` to the Web App URL in the form submission handler.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
