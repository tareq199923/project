<?php
// update_profile.php - Handle Profile Update
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please login.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Get JSON input
    $data = json_decode(file_get_contents('php://input'), true);
    
    $user_id = $_SESSION['user_id'];
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $dob = $data['dob'] ?? '';
    
    // Validation
    if (empty($name) || empty($email) || empty($dob)) {
        echo json_encode(['success' => false, 'message' => 'Required fields missing!']);
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
    
    // Check if email is already used by another user
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt->bind_param("si", $email, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already used by another account!']);
        exit;
    }
    
    // Update user profile
    $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, phone = ?, dob = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $name, $email, $phone, $dob, $user_id);
    
    if ($stmt->execute()) {
        // Update session
        $_SESSION['name'] = $name;
        
        // Get updated user data
        $stmt = $conn->prepare("SELECT username, name, email, gender, dob, phone, type FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully!', 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update profile.']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>