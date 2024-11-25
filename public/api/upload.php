<?php
// Allow cross-origin requests for testing
header("Access-Control-Allow-Origin: *");

// Define the target directory
$targetDir = '../gallery/';

// Check if the gallery directory exists, if not, create it
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Check if files have been uploaded
if (isset($_FILES['files'])) {
    $folderName = $_POST['folderName'];
    $targetFolder = $targetDir . $folderName . '/';

    // Check if the target folder exists, if not, create it
    if (!is_dir($targetFolder)) {
        mkdir($targetFolder, 0777, true);
    }

    $fileCount = count($_FILES['files']['name']);
    for ($i = 0; $i < $fileCount; $i++) {
        $fileName = basename($_FILES['files']['name'][$i]);
        $targetFilePath = $targetFolder . $fileName;

        // Move the uploaded file to the target directory
        if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $targetFilePath)) {
            echo "The file " . htmlspecialchars($fileName) . " has been uploaded successfully.\n";
        } else {
            echo "There was an error uploading the file " . htmlspecialchars($fileName) . ".\n";
        }
    }
} else {
    echo "No files uploaded.";
}
?>