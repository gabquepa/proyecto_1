<?php 
$conexion= mysql_connect ( ) or die ("no se puede conectar");

mysql_select_db("Proyecto_1") or die ("no se puede conectar");
print "estoy conectada";

mysql_close($conexion);

?>