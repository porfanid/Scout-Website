// deploy.js
import FtpDeploy from "ftp-deploy";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const ftpDeploy = new FtpDeploy();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: 21, // Change if your FTP server uses a different port
    localRoot: path.join(__dirname,"..", "dist"),
    remoteRoot: "/", // Set the remote directory path
    include: ["*", "**/*"], // Upload all files and subdirectories
    deleteRemote: false, // Set to true if you want to delete files not in the local folder
    forcePasv: true // Use passive mode (recommended for FTP transfers)
};

// Deploy the files to the FTP server
ftpDeploy.deploy(config)
    .then(() => console.log("Deployment finished successfully!"))
    .catch(err => console.error("Deployment error:", err));
