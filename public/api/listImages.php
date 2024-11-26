<?php
header('Content-Type: application/json');

$folderId = $_GET['folderId'];
$directoryPath = '../gallery/' . $folderId;

if (!is_dir($directoryPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Folder not found']);
    exit;
}

$files = scandir($directoryPath);
$imageFiles = array_filter($files, function($file) use ($directoryPath) {
    return preg_match('/\.(jpg|jpeg|png|gif)$/i', $file) && is_file($directoryPath . '/' . $file);
});

$imageUrls = array_map(function($file) use ($folderId) {
    return '/gallery/' . $folderId . '/' . $file;
}, $imageFiles);

echo json_encode($imageUrls);
?>