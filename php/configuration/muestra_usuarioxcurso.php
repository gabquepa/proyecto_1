<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

mysql_query("SET CHARACTER SET utf8");

$query = mysql_query('CALL muestra_usuarioxcurso("'.$objData->id_usuario.'");') or die ("Error");
$nfilas = mysql_num_rows ($query); 
$lista=[];

for ($i=0; $i < $nfilas; $i++) { 
	$fila = mysql_fetch_array ($query);
	$lista[$i]=$fila;
}

echo json_encode($lista);

mysql_close($conexion);
?>

