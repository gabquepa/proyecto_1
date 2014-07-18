(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', function($scope) {

		 this.usuarios = arregloUsuarios;
		  this.carreras = arregloCarreras;
		  this.miCarrera = {};
		  this.miCurso = {};
		  this.indextemp = 0;
		  this.buscarIndex= function(){

		  	for(i=0;i<this.carreras.length;i++){

		  		if(this.carreras[i].nombre === this.miCarrera.nombre){
		  		
		  			this.carreras[i].cursos.push(this.miCurso);
		  		}
		  	}

		  this.miCarrera = {};
		  }

		  this.modifCarrera= function(){

		  	
		  	for(i=0;i<this.carreras.length;i++){

		  		if(this.carreras[i].nombre === this.miCarrera.nombre){
		  		
		  			// this.carreras[i].cursos.push(this.miCurso);
		  			$('#codCarrera').val(this.carreras[i].codigo);
		  			$('#nomCarrera').val(this.carreras[i].nombre);
		  			this.indextemp=i;

		  		}
		  	}

		  this.miCarrera = {};
		  }
		  this.actualizarCarrera= function(){
		  		if (!this.miCarrera.nombre=="") {
		  			this.carreras[this.indextemp].nombre=this.miCarrera.nombre;
		  		};
		  		if (!this.miCarrera.codigo=="") {
		  			this.carreras[this.indextemp].codigo=this.miCarrera.codigo;
		  		};	
		  		
		  			
		  		$('#codCarrera').val("");
		  		$('#nomCarrera').val("");
				this.miCarrera = {};
		  }

		  

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
		estado:'activo',
		cursos: [
		{
			idCurso: 1,
			nombreCurso: 'Web 1'
			
		},
		{
			idCurso: 2,
			nombreCurso: 'Web 2'
			
		},
		]

	},
	{
		codigo:2,	
		nombre:'Desarrollo de software',
		estado:'inactivo',
		cursos: [
		{
			idCurso: 1,
			nombreCurso: 'Programacion 1'
			
		},
		{
			idCurso: 2,
			nombreCurso: 'Programacion 2'
			
		},
		]
	 },
	 {
	 	codigo:3,	
		nombre:'Inglés',
		estado:'inactivo',
		cursos: [
		{
			idCurso: 1,
			nombreCurso: 'Ingles 1'
			
		},
		{
			idCurso: 2,
			nombreCurso: 'Ingles 2'
			
		},
		]
	 }

	];




})();

$(".stars").rating();