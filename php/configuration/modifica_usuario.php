<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

mysql_query("SET CHARACTER SET utf8");

$query = mysql_query('CALL modifica_usuario("'.$objData->tipo.'","'.$objData->email.'","'.$objData->nombre.'","'.$objData->apellido.'","'.$objData->genero.'","'.$objData->id_usuario.'","'.$objData->password.'");') or die ("Error");
// echo 'CALL modifica_usuario("'.$objData->tipo.'","'.$objData->email.'","'.$objData->nombre.'","'.$objData->apellido.'","'.$objData->genero.'","'.$objData->id_usuario.'","'.$objData->password.'");';
mysql_close($conexion);

?>