<?php 
$conexion= mysql_connect ( "localhost:8889", "root", "root") or die ("no se puede conectar");
print "estoy conectada";
mysql_select_db("Proyecto_1") or die ("no se puede conectar");

$consulta = mysql_query ( "select * from curso", $conexion) or die ("fallo de la consulta");

$nfilas = mysql_num_rows ($consulta);



for ($i=0; $i < $nfilas; $i++) { 
	$fila = mysql_fetch_array ($consulta);
	print "<br>id_curso: " .$fila["id_curso"];
	print "<br>id_carrera: " .$fila["id_carrera"];
	print "<br>nombre: " .$fila["nombre"];
	print "<br>estado: " .$fila["estado"]."<br>";
}
mysql_close($conexion);

?>	