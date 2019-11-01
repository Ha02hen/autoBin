<?php
        $conn = mysqli_connect("106.54.103.171","root","720618","recycle");
        if(!$conn)
        {
                die("Connect failed: " . mysqli_connect_error());
        }
        if(empty($_POST['id']) && $_POST['id'] !== '0')
        {
                die('id is empty');
        }
        if(empty($_POST['service']))
        {
                die('service is empty');
        }
        mysqli_query($conn, "set names 'utf8'");
        $id=$_POST['id'];
        $service=$_POST['service'];
        if(!empty($_POST['service'])) {
                $sql = "UPDATE table_test SET service = '$service' WHERE id = $id";
                $result = mysqli_query($conn,$sql);
                if (!$result)
                {
                        die('Error: ' . mysqli_connect_error());
                }
        }
        $sql1 = "SELECT * FROM table_test";
        $result1 = mysqli_query($conn,$sql1);
?>
