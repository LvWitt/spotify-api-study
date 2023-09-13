<?php
 if (isset($_SERVER["HTTP_ORIGIN"])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

$conn = new PDO("mysql:host=localhost:8889;dbname=test", "root", "root");

$sql = "UPDATE tracks SET track_name = :track_name, artist_name = :artist_name, img_url = :img_url  WHERE id = :id";
$result = $conn->prepare($sql);
 
$result->execute([
    ":id" => $_POST["id"],
    ":track_name" => $_POST["track_name"],
    ":artist_name" => $_POST["artist_name"],
    ":img_url" => $_POST["img_url"],
]);
 

$sql = "SELECT * FROM tracks WHERE id = :id";
$result = $conn->prepare($sql);
$result->execute(array(
    ":id" => $_POST["id"]
));
$data = $result->fetch();

echo json_encode($data);
?>