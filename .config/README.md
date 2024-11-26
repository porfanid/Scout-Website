d# .config Directory

The `.config` directory contains configuration files and settings for various tools and services used in the project. This directory helps to keep the project root clean and organized by grouping all configuration files in one place.

## Contents

- **`firebase/`**: Contains Firebase configuration files.
  - **`firestore.rules`**: Firestore security rules.
  - **`firestore.indexes.json`**: Firestore indexes configuration.
  - **`remoteconfig.template.json`**: Remote Config template.
  - **`storage.rules`**: Storage security rules.

- **`vite.config.js`**: Configuration file for Vite, a fast build tool and development server.
- **`jest.config.js`**: Configuration file for Jest, a JavaScript testing framework.
- **`babel.config.js`**: Configuration file for Babel, a JavaScript compiler.

## Firebase Configuration

The Firebase configuration files are used to define security rules, indexes, and templates for various Firebase services.

- **`firestore.rules`**: Defines security rules for Firestore.
- **`firestore.indexes.json`**: Specifies indexes for Firestore queries.
- **`remoteconfig.template.json`**: Template for Remote Config parameters.
- **`storage.rules`**: Defines security rules for Firebase Storage.


## Jest Configuration

The `jest.config.js` file contains the configuration for Jest, which is used to run tests in the project.

## Babel Configuration

The `babel.config.js` file contains the configuration for Babel, which is used to compile JavaScript code.
