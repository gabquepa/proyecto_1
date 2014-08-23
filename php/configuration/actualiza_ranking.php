<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$query = mysql_query('CALL actualiza_ranking("'.$objData->num_cinco.'","'.$objData->ranking_cinco.'");');
mysql_close($conexion);
?>