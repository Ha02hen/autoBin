<?php
$socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
 
    if(socket_bind($socket,'127.0.0.1',9501) == false){
        echo 'server bind fail:'.socket_strerror(socket_last_error());
    }
    if(socket_listen($socket,4)==false){
        echo 'server listen fail:'.socket_strerror(socket_last_error());
    }
 
    $accept_resource = socket_accept($socket);
 
    if($accept_resource !== false){
        echo("connect success".PHP_EOL);
 
        while (true) {
        	$string = socket_read($accept_resource,1024);
 
            echo 'server receive is :'.$string.PHP_EOL;
            
            $conn = mysqli_connect("106.54.103.171","root","720618","recycle");
            if(!$conn)
            {
                    die("Connect failed: " . mysqli_connect_error());
            }
            $str = explode('&', $string);
            if(!empty($str[1])) {
                $sql = "UPDATE table_test SET service = '$str[1]' WHERE id = $str[0]";
                $result = mysqli_query($conn,$sql);
                if (!$result)
                {
                        die('Error: ' . mysqli_connect_error());
                }
            }

        }
      
        socket_close($accept_resource);
    }
 
socket_close($socket);
?>