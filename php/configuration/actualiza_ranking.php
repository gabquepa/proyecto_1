<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$query = mysql_query('CALL actualiza_ranking("'.$objData->num_uno.'","'.$objData->num_dos.'","'.$objData->num_tres.'","'.$objData->num_cuatro.'","'.$objData->num_cinco.'","'.$objData->ranking_uno.'","'.$objData->ranking_dos.'","'.$objData->ranking_tres.'","'.$objData->ranking_cuatro.'","'.$objData->ranking_cinco.'");');
mysql_close($conexion);
?>