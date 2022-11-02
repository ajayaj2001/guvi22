<?php
if (isset($_POST['email'])) {

$email = $_POST['email'];
$password  =$_POST['password'];
$name  =$_POST['name'];
$pNum  =$_POST['pNum'];



if(!empty($email) && !empty($password)&&!empty($name)&&!empty($pNum))
    {

       
        $con= mysqli_connect("localhost","root","","useraccount","3306");
        
        $query = $con->query("SELECT * FROM useraccount WHERE email='".$email."'");
        $numrows = mysqli_num_rows($query);
        if($numrows == 0)
        {
            $sql = "INSERT INTO useraccount(name,password,email,phonenumber) VALUES('$name','$password','$email','$pNum')";

            $result = $con->query($sql);

            if($result)
            {
               writeMsg($email,$password,$name,$pNum);
                echo 'success';
            }
            else
            {
                echo "Failure";
            }
        }
        else
        {
            echo 'This email already exists';
        }

    }else{
        echo("some field empty");
    }
}

function writeMsg($email,$password,$name,$phNum) {

    $file=__DIR__."\..\db\db.json";

    $json = json_decode(file_get_contents($file),TRUE);

   array_push($json, array('email' =>$email,'password'=>$password,'name'=>$name,"phoneNumber"=>$phNum ));


     file_put_contents($file, json_encode($json));
  }

  
?>
