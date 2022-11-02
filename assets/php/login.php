
 <?php

$email = $_POST['email'];
$password  =$_POST['password'];


    if(!empty($email) || !empty($password)) {

        //$con=mysql_connect('localhost','root','') or die(mysql_error());
        //mysql_select_db('user_registration') or die("cannot select DB");

        $con= mysqli_connect("localhost","root","","useraccount","3306");
    
        $query=$con->query("SELECT * FROM useraccount  WHERE email='".$email."' AND password='".$password."'");
        $numrows=mysqli_num_rows($query);
        if($numrows!=0)
        {
        while($row=mysqli_fetch_assoc($query))
        {
        $dbemail=$row['email'];
        $dbpassword=$row['password'];
        }
    
        if($email == $dbemail && $password == $dbpassword)
        {
        session_start();
        $_SESSION['sess_user']=$dbemail;
        /* Redirect browser */
        echo "success";

        }
        } else {
            echo 'Invalid email or password';
        }
    
    } else {
        echo 'All fields are required!';
    }
    
 ?>

