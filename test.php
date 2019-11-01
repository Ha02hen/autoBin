<?php
        $conn = mysqli_connect("106.54.103.171","root","720618","recycle");
        if(!$conn)
        {
                die("Connect failed: " . mysqli_connect_error());
        }
        
        $sql = "SELECT * FROM table_test"; 
        mysqli_query($conn, "set names 'utf8'");
        $result = mysqli_query($conn, $sql);
        class Recycle{
                public $id;
                public $capacity;
                public $service;
                public $longitude;
                public $latitude;
        }
        if(mysqli_num_rows($result) > 0) {
                //输出数据
                while($row = mysqli_fetch_assoc($result)) {
                        $recycle=new Recycle();
                        $recycle->id=$row["id"];
                        $recycle->capacity=$row["capacity"];
                        $recycle->service=$row["service"];
                        $recycle->longitude=$row["longitude"];
                        $recycle->latitude=$row["latitude"];

                        $data[] = $recycle;
                }
                        echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
        }else {

                        echo "0 结果";
                }
        mysqli_close($conn);
        ?>