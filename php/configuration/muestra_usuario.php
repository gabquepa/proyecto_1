<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

mysql_query("SET CHARACTER SET utf8");

$query = mysql_query('CALL muestra_usuario("'.$objData->email.'");') or die ("Error");

$fila = mysql_fetch_assoc($query);
$resulto[] = $fila;
// var_dump($fila);

echo json_encode($resulto);

mysql_close($conexion);

?>