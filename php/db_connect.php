<?php
// db_connect.php - Database Connection File
$host = 'localhost';
$dbname = 'safenets_db';
$username = 'root';  // Default XAMPP username
$password = '';      // Default XAMPP password is empty

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8
    $conn->set_charset("utf8");
    
} catch (Exception $e) {
    die("Database connection error: " . $e->getMessage());
}
?>