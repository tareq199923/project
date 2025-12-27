<?php
// get_reports.php - Get all reports (Admin/Consultant only)
session_start();
require_once 'db_connect.php';

header('Content-Type: application/json');

// Check if user is logged in and is admin or consultant
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please login.']);
    exit;
}

if ($_SESSION['type'] !== 'admin' && $_SESSION['type'] !== 'consultant') {
    echo json_encode(['success' => false, 'message' => 'Access denied. Admin or Consultant only.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Get all reports with user information
    $sql = "SELECT r.id, r.incident_description, r.relationship, r.bullying_type, r.status, r.submitted_at,
                   u.name as reporter_name, u.email as reporter_email, u.username as reporter_username
            FROM reports r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.submitted_at DESC";
    
    $result = $conn->query($sql);
    
    if ($result) {
        $reports = [];
        while ($row = $result->fetch_assoc()) {
            $reports[] = $row;
        }
        echo json_encode(['success' => true, 'reports' => $reports]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to fetch reports.']);
    }
    
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>