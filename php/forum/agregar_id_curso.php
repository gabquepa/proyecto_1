<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

mysql_query("SET CHARACTER SET utf8");


//$query = mysql_query('CALL agregar_id_curso("'.$objData->id_carrera.'","'.$objData->nombre.'");') 

$query = mysql_query('CALL invitados("'.$objData->id_carrera.'","'.$objData->nombre.'");') or die ("Error"); //

$fila = mysql_fetch_array ($query)

echo json_encode($fila);

mysql_close($conexion);
  


  
/* Esto va en el controller 

$http.post("/Proyecto_1/php/forum/listaForos.php", {"id_usuario" : "1"}).
success(function(data, status) {
	
}).
error(function(data, status) {
	
});

*/

?>