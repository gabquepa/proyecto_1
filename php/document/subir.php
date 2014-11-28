<?php

$archivo = $_FILES["archivo"] ['name'];
$destino = "/Applications/MAMP/htdocs/Proyecto_1/storage/".$archivo;
copy($_FILES["archivo"] ['tmp_name'],$destino);
header ("Location: /Proyecto_1/documentos.html");

?>