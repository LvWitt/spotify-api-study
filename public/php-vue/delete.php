<?php
$conn = new PDO("mysql:host=localhost:3307;dbname=stats-app", "root", "");
 
$sql = "DELETE FROM users WHERE id = :id";
$result = $conn->prepare($sql);
$result->execute(array(
    ":id" => $_POST["id"]
));
 
echo "Done";
?>