<?php
 
// connect database
$conn = new PDO("mysql:host=localhost:3307;dbname=stats-app", "root", "");
 
// get all users from database sorted by latest first
$sql = "SELECT * FROM tracks ORDER BY id DESC";
$result = $conn->prepare($sql);
$result->execute([]);
$data = $result->fetchAll();
 
// send all records fetched back to AJAX
echo json_encode($data);

?>