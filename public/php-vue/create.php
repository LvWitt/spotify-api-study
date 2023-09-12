
<?php
if(isset($_SERVER["HTTP_ORIGIN"]))
{
    // You can decide if the origin in $_SERVER['HTTP_ORIGIN'] is something you want to allow, or as we do here, just allow all
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
else
{
    //No HTTP_ORIGIN set, so we allow any. You can disallow if needed here
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");    // cache for 10 minutes

if($_SERVER["REQUEST_METHOD"] == "OPTIONS")
{
    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"]))
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT"); //Make sure you remove those you do not want to support

    if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    //Just exit with 200 OK with the above headers for OPTIONS method
    exit(0);
}
// connect database
$conn = new PDO("mysql:host=localhost:3307;dbname=stats-app", "root", "");
 if(!$conn){
    echo "Error! Db Not Found"; 
}
// prepare insert statement
$sql = "INSERT INTO tracks (id, track_name, artist_name, img_url) VALUES (:id, :track_name, :artist_name, :img_url)";
$result = $conn->prepare($sql);
 
// execute the query
$result->execute([
    ":id" => $_POST["id"],
    ":track_name" => $_POST["track_name"],
    ":artist_name" => $_POST["artist_name"],
    ":img_url" => $_POST["img_url"],
]);
 
echo "Done";
?>

