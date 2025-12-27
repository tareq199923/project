<?php
// register.php - Handle User Registration
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $gender = $data['gender'] ?? '';
    $dob = $data['dob'] ?? '';
    $phone = trim($data['phone'] ?? '');
    $type = 'user'; // Default type
    
    // Validation
    if (empty($username) || empty($password) || empty($name) || empty($email) || empty($gender) || empty($dob)) {
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled!']);
        exit;
    }
    
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters!']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format!']);
        exit;
    }
    
    if (!empty($phone) && strlen($phone) !== 11) {
        echo json_encode(['success' => false, 'message' => 'Phone must be 11 digits!']);
        exit;
    }
    
    // Calculate age
    $dobDate = new DateTime($dob);
    $today = new DateTime();
    $age = $today->diff($dobDate)->y;
    
    if ($age < 14) {
        echo json_encode(['success' => false, 'message' => 'Must be at least 14 years old!']);
        exit;
    }
    
    // Check if username exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Username already taken!']);
        exit;
    }
    
    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered!']);
        exit;
    }
    
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, password, name, email, gender, dob, phone, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $username, $password, $name, $email, $gender, $dob, $phone, $type);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>