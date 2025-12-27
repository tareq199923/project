<?php
// submit_report.php - Handle Report Submission
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
    $incident_description = trim($data['incidentDesc'] ?? '');
    $relationship = trim($data['relationship'] ?? '');
    $bullying_type = trim($data['bullyingType'] ?? '');
    
    // Validation
    if (empty($incident_description) || empty($relationship) || empty($bullying_type)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required!']);
        exit;
    }
    
    // Insert report
    $stmt = $conn->prepare("INSERT INTO reports (user_id, incident_description, relationship, bullying_type) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $user_id, $incident_description, $relationship, $bullying_type);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Report submitted successfully! Our team will review it.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to submit report. Please try again.']);
    }
    
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>