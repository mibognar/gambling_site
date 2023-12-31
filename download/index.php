<?php
// Set the correct password
$correctPassword = 'yourPassword'; // Replace with your actual password

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the password from POST data
    $password = $_POST['password'] ?? '';

    // Validate the password
    if ($password === $correctPassword) {
        // Correct password, proceed to file download

        // Specify the file to download
        $file = '../data/experiment_data.csv'; // Replace with your file path

        // Check if the file exists
        if (file_exists($file)) {
            // Set headers to trigger the download
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            
            // Clear output buffer
            ob_clean();
            flush();
            
            // Read the file and send it to the output buffer
            readfile($file);
            
            exit;
        } else {
            echo 'Error: File not found.';
        }
    } else {
        echo 'Error: Incorrect password.';
    }
}
?>

<!-- HTML form for password input -->
<!DOCTYPE html>
<html>
<head>
    <title>File Download</title>
</head>
<body>
    <form action="index.php" method="post">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <button type="submit">Download File</button>
    </form>
</body>
</html>