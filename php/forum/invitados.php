<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$query = mysql_query('CALL invitados("'.$objData->id_foro.'","'.$objData->email.'");') or die ("Error");

mysql_close($conexion);


?>
