<?php
session_start();

if(isset($_SESSION["sess_user"])){
  $email = $_SESSION["sess_user"];

  $con= mysqli_connect("localhost","root","","useraccount","3306");
    

  $user = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM useraccount WHERE email ='".$email."'"));

  echo $user["name"];
}
else{
 echo "redirect";
}
?>