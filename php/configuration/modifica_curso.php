<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

mysql_query("SET CHARACTER SET utf8");

$query = mysql_query('CALL modifica_curso("'.$objData->nombre.'","'.$objData->estado.'","'.$objData->id_curso.'");') or die ("Error");
// echo 'CALL modifica_curso("'.$objData->nombre.'","'.$objData->estado.'","'.$objData->id_curso.'");';
mysql_close($conexion);

?>