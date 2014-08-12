<?php 
$conexion= mysql_connect ("localhost", "root", "root") or die ("no se puede conectar");// direccion para encontrar y conectarse a la base de datos.

mysql_select_db("Proyecto_1") or die ("no se puede conectar");//selecciona la base de datos en donde vamos a hacer las llamadas

$consulta = mysql_query ( "select * from foro", $conexion) or die ("fallo de la consulta"); // select donde llamo a mi tabla

$consultaProfe = mysql_query ( "select * from usuario", $conexion) or die ("fallo de la consulta"); 

$nfilas = mysql_num_rows ($consulta); //retorna las todas las filas de la tabla

$nfilasProfe= mysql_num_rows ($consultaProfe); 

for ($i=0; $i < $nfilas; $i++) { 
	$fila = mysql_fetch_array ($consulta);// me devuelve la fila entera

	$filaProfe = mysql_fetch_array ($consultaProfe);

	print "<br>Titulo: " .$fila["titulo"];
	print "<br>Texto: " .$fila["texto"];
	print "<br>Fecha: " .$fila["fecha"];

	for($j=0; $j < $nfilasProfe; $j++){
		if($fila["id_usuario"]==$filaProfe["id_usuario"]){
			print "<br>Profe: " .$filaProfe["nombre"]." ".$filaProfe["apellido"]."<br>";
			break;
		}
		else{
			print("<br>ERROR<br>");
		}
	}
}


print ("<br>estoy conectada");

mysql_close($conexion);

?>