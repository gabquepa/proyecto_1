(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', function($scope) {

		 this.usuarios = arregloUsuarios;
		  this.carreras = arregloCarreras;
		  this.miCarrera = {};
		  this.miCarreraCC = {};
		  this.miCursoCC = {};
		  this.miCarreraMC = {};
		  this.miCursoMC = {};
		  this.indextemp = 0;



		this.addCarrera = function(){
			
			this.miCarrera.estado = 'activo';
			this.miCarrera.cursos = {};
			 console.log(this.miCarrera.estado);
			console.log(this.miCarrera.cursos);
			this.carreras.push(this.miCarrera);
			
			console.log(this.carreras[3].estado);
			console.log(this.carreras[3].cursos);
			 
			 // console.log(this.carrera[3].estado);
			 // console.log(this.carrera[3].cursos);
			 // console.log(this.carreras[0].nombre);
			 // console.log(this.carreras[1].nombre);
			 // console.log(this.carreras[2].nombre);
			 // console.log(this.carreras[3].nombre);
			
			 this.miCarrera = {};	
		};


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
				this.indextemp="";
		  }

		 


		  this.crearCurso= function(){

            
		  	for(var i=0;i<this.carreras.length;i++){
              
		  		if(this.carreras[i].nombre === this.miCarreraCC.nombre){
		  		    // console.log(this.miCursoCC.nombreCurso);
		  		    // console.log(this.miCursoCC.idCurso);
		  		    // console.log(this.miCursoCC);
		  		    // console.log(this.carreras[i].cursos);
		  			//this.carreras[i].cursos.push(this.miCursoCC);
		  			this.carreras[i].cursos.nombreCurso=this.miCursoCC.nombreCurso;
		  			this.carreras[i].cursos.idCurso=this.miCursoCC.idCurso;
		  		    console.log(this.carreras[i].cursos);
		  		}
		  	}
		 

		  }


 			this.getCurso = function(){
 					console.log(this.miCarreraMC.cursos);
		  		return this.miCarreraMC.cursos;
		 	 }

		   this.modifCurso= function(){
		   			console.log('HHH');
		  	
		  	for(i=0;i<this.carreras.length;i++){

		  		if(this.carreras[i].nombre === this.miCarreraMC.nombre){
		  		
		  			// this.carreras[i].cursos.push(this.miCurso);
		  			$('#modifIdCurso').val(this.carreras[i].codigo);
		  			$('#modifNombreCurso').val(this.carreras[i].nombre);
		  			this.indextemp=i;

		  		}
		  	}

		  //this.miCarrera = {};
		  }

		  this.actualizarCurso= function(){

		  	for(i=0;i<this.carreras[this.indextemp].cursos.length;i++){

		  		if(this.carreras[this.indextemp].cursos[i].nombreCurso === this.miCursoMC.nombreCurso){
		  			this.carreras[this.indextemp].cursos[i].nombreCurso= this.miCursoMC.nombreCurso;	
		  		}
		  		if(this.carreras[this.indextemp].cursos[i].idCurso === this.miCursoMC.idCurso){
		  			this.carreras[this.indextemp].cursos[i].idCurso= this.miCursoMC.idCurso;	
		  		}
		  	 }

		  	   $('#modifIdCurso').val("");
		  	    $('#modifNombreCurso').val("");
				
				this.miCarreraMC = {};
				this.indextemp="";
				this.miCursoMC={};

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