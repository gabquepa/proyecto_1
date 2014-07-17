(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', function($scope) {

		 this.usuarios = arregloUsuarios;
		  this.carreras = arregloCarreras;

	});
//Arreglo Carreras//
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


//Arreglo Carreras//
	var arregloCarreras =[
	{
		codigo:1,	
		nombre:'Desarrollo y diseño Web',
		estado:'activo'
	},
	{
		codigo:2,	
		nombre:'Desarrollo de software',
		estado:'inactivo'
	 },
	 {
	 	codigo:3,	
		nombre:'Inglés',
		estado:'inactivo'
	 }

	];



})();

$(".stars").rating();