<?php
// login.php - Handle User Login
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $remember = $data['remember'] ?? false;
    
    // Validation
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password are required!']);
        exit;
    }
    
    // Check credentials
    $stmt = $conn->prepare("SELECT id, username, password, name, email, gender, dob, phone, type FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password!']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password (plain text for now - should use password_hash in production)
    if ($password !== $user['password']) {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password!']);
        exit;
    }
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['type'] = $user['type'];
    
    // Remove password from response
    unset($user['password']);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Login successful!',
        'user' => $user,
        'remember' => $remember
    ]);
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>