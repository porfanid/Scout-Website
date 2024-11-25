<?php
// Allow cross-origin requests for testing
header("Access-Control-Allow-Origin: *");

// Function to delete a folder and its contents
function deleteFolder($folderPath) {
    if (!is_dir($folderPath)) {
        return false;
    }

    $files = array_diff(scandir($folderPath), array('.', '..'));
    foreach ($files as $file) {
        $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
        if (is_dir($filePath)) {
            deleteFolder($filePath);
        } else {
            unlink($filePath);
        }
    }
    return rmdir($folderPath);
}

// Check if the folder name is provided
if (isset($_POST['folderName'])) {
    $folderName = $_POST['folderName'];
    $targetDir = '../gallery/' . $folderName;

    if (deleteFolder($targetDir)) {
        echo "Test environment: " . htmlspecialchars($folderName) . " has been created successfully.";
        echo "The folder " . htmlspecialchars($folderName) . " has been deleted successfully.";
    } else {
        echo "There was an error deleting the folder " . htmlspecialchars($folderName) . ".";
    }
} else {
    echo "No folder name provided.";
}
?>