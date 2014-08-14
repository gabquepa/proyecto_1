<?php 
$conexion= mysql_connect ( "localhost", "root", "root") or die ("no se puede conectar");
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$query = mysql_query('CALL textoForo("'.$objData->id_foro.'");') or die ("Error"); 

$texto = mysql_fetch_array ($query);// me devuelve la fila afectada

echo json_encode($texto);

mysql_close($conexion);

/* Esto va en el controller 

$http.post("/Proyecto_1/php/forum/listaForos.php", {"id_usuario" : "1"}).
success(function(data, status) {
	
}).
error(function(data, status) {
	
});

*/

?>