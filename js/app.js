(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', function($scope) {

		 this.usuarios = arregloUsuarios;
	});

	var arregloUsuarios =[
	{
		nombre:'pepe',
		genero:'masculino',
		correo:'p@p.com',
		password:'123',
		categoria:'profesor',
		estado:'activo'
	},
	{
		nombre:'coco',
		genero:'masculino',
		correo:'c@c.com',
		password:'123',
		categoria:'estudiante',
		estado:'inactivo'
	 }

	];



})();

$(".stars").rating();