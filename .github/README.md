# Scout Website

Welcome to the **Scout Website** project! This repository contains the source code for a React-based web application built with Vite. The project leverages various modern web development tools and libraries to provide a robust and efficient development experience.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Material-UI**: A popular React UI framework.
- **Firebase**: Backend services for authentication, database, and more.
- **i18next**: Internationalization framework for React.
- **Jest**: JavaScript testing framework.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or Yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/porfanid/scout-website.git
   cd scout-website
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

or

```sh
yarn dev
```

This will start the Vite development server and open the application in your default web browser.

## Project Structure

```plaintext
scout-website/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── config/             # Configuration files
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Page components
│   ├── styles/             # Styling files
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   ├── index.jsx           # Entry point
│   └── ...                 # Other source files
├── .babelrc                # Babel configuration
├── .eslintrc.json          # ESLint configuration
├── package.json            # Project metadata and scripts
├── README.md               # Project documentation
└── ...                     # Other project files
```

## Scripts

The following scripts are available in the `package.json` file:

- `dev`: Start the development server.
- `build`: Build the project for production.
- `preview`: Preview the production build.
- `lint`: Run ESLint to check for code issues.
- `test`: Run Jest tests.
- `publish`: Deploy the project.
- `generate-sitemap`: Generate the sitemap.

## Dependencies

### Main Dependencies

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `@mui/material`: ^6.1.6
- `firebase`: ^11.0.1
- `i18next`: ^23.16.4

### Development Dependencies

- `vite`: ^5.4.10
- `jest`: ^29.7.0
- `eslint`: ^9.13.0
- `@babel/preset-env`: ^7.26.0
- `@babel/preset-react`: ^7.25.9

## Development

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## Testing

To run the tests, use the following command:

```sh
npm run test
```

or

```sh
yarn test
```

This will execute all the Jest tests in the project.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.


---

Happy coding! 🚀