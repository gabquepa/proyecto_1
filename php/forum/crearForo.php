<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);
$consulta = 'CALL crearForo("'.$objData->id_usuario.'","'.$objData->id_curso.'","'.$objData->id_moderador.'","'.$objData->titulo.'","'.$objData->estado.'","'.$objData->fecha.'","'.$objData->texto.'","'.$objData->periodo.'");';
$query = mysql_query($consulta) or die ("Error");

var_dump($consulta);

mysql_close("test: ".$conexion);

?>