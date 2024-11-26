# scripts Directory

The `scripts` directory contains various utility scripts used for different tasks in the project. These scripts help automate processes such as user creation, deployment, and sitemap generation.

## Contents

- **`createUserId.js`**: Script to create a user record in Firebase Firestore.
- **`deploy.js`**: Script to deploy the project to an FTP server.
- **`generate-sitemap.cjs`**: Script to generate a sitemap for the project.

## createUserId.js

This script initializes the Firebase Admin SDK and creates a user record in Firestore with a specified user ID and role.

### Usage

Run the script using Node.js:

```sh
node scripts/createUserId.js
```

## deploy.js

This script uses the `ftp-deploy` package to deploy the project to an FTP server. It reads FTP credentials from a `.env` file.

### Usage

Ensure you have a `.env` file with the necessary FTP credentials:

```env
FTP_USER=your_ftp_username
FTP_PASSWORD=your_ftp_password
FTP_HOST=your_ftp_host
```

Run the script using Node.js:

```sh
node scripts/deploy.js
```

## generate-sitemap.cjs

This script generates a sitemap for the project using the `sitemap` package. It dynamically imports routes from the project and writes the sitemap to the `dist` directory.

### Usage

Run the script using Node.js:

```sh
node scripts/generate-sitemap.cjs
```
