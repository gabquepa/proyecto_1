(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', ['$scope', '$http', function($scope, $http){

		this.usuarios = arregloUsuarios;
		  this.carreras = arregloCarreras;
		   this.profecurso =arregloProfeCurso;
		   this.estudcurso =arregloEstuCurso;
		   this.estudcursotemp =arregloEstuCursoTemp;
		   this.estudcursobusctemp=arregloEstuCursoBuscTemp;
		  this.miCarrera = {};
		  this.miCarreraCC = {};
		  this.miCursoCC = {};
		  this.miCarreraMC = {};
		  this.miCursoMC = {};
		  this.indextemp = 0;
          


		this.addCarrera = function(){
            var nomCarrera = $('#nomCarrera').val();
             if (nomCarrera.trim() == '') {
             	 alertify.log("Debe completar todos los campos");
             }else{
				$http.post("/Proyecto_1/php/configuration/crea_carrera.php", { "nombre" : nomCarrera,  "estado" : '1', "thumb" : "test.png"
				}).
				success(function(data, status) {
					alertify.success("La carrera fue creada correctamente");
				})
				.
				error(function(data, status) {
					alertify.error("Error");
				});
			 }
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
		  }
		  this.actualizarCarrera= function(){

		  	var codCarrera = $('#mcodCarrera').val();
            var nomCarrera = $('#mnomCarrera').val();
             
             if (codCarrera.trim() == '' || nomCarrera.trim() == '' ) {
             	 // alert("Debe llenar todos los campos");
             	 alertify.log("Debe completar todos los campos");
             	// alertify.success("OJO");
             }else{

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
				alertify.success("La carrera se modifico correctamente");
			}


		  }//Fin FUncion

		 


		  this.crearCurso= function(){
             
             var codCurso = $('#codCurso').val();
             var nomCurso = $('#nomCurso').val();
             console.log(codCurso);
             if (codCurso.trim() == '' || nomCurso.trim() == '') {
             	alertify.log("Debe completar todos los campos");
             }else{
            
		  	for(var i=0;i<this.carreras.length;i++){
                
		  		if(this.carreras[i].nombre === this.miCarreraCC.nombre){
		  		    
					this.miCursoCC.id=this.carreras[i].cursos.length;
		  			this.carreras[i].cursos.push(this.miCursoCC);
		  		}
		  	}
		 
			this.miCursoCC={};
			alertify.success("El curso se creo correctamente");
		  }

		}//Fin de Validacion
 			this.getCurso = function(){
 					
		  		return this.miCarreraMC.cursos;
		 	 }

		   this.modifCurso= function(){

		   	
		   		
		  	
				  	for(i=0;i<this.carreras.length;i++){

				  		if(this.carreras[i].nombre === this.miCarreraMC.nombre){
				  		
				  			// this.carreras[i].cursos.push(this.miCurso);
				  			$('#modifIdCurso').val(this.carreras[i].codigo);
				  			$('#modifNombreCurso').val(this.carreras[i].nombre);
				  			this.indextemp=i;

				  		}
				  	}
				  	
			
		  //this.miCarrera = {};
		  }// Fin Funcion

		  this.actualizarCurso= function(){

		  	 var codCurso = $('#modifIdCurso').val();
             var nomCurso = $('#modifNombreCurso').val();

             console.log(codCurso);
             if (codCurso.trim() == '' || nomCurso.trim() == '') {
             	alertify.log("Debe completar todos los campos");
             }else{

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
				alertify.success("El curso se modifico correctamente");
			}//Fin validacion

		  }

		  

}]);


//Arreglo cursoEstudianteTemp//
    var arregloEstuCursoBuscTemp =[
	];
    var arregloEstuCursoTemp =[
	];
	
	//Arreglo cursoEstudiante//
    var arregloEstuCurso =[
	{
		
		curso:'Proyecto 1',
		estudiante:'sergio@ucenfotec.ac.cr',
	},
	{
		
		curso:'Proyecto 1',
		estudiante:'alejandro@ucenfotec.ac.cr',
	}	
	];
	
	
//Arreglo Carreras//
    var arregloProfeCurso =[
	{
		carrera:'Desarrollo y Diseño Web',
		curso:'Proyecto 1',
		profe:'alvaro@ucenfotec.ac.cr',
	},
	{
		carrera:'Desarrollo y Diseño Web',
		curso:'Web 2',
		profe:'alvaro@ucenfotec.ac.cr',
	}	
	];





	var arregloUsuarios =[
	{
		nombre:'Álvaro Cordero Peña',
		genero:'masculino',
		correo:'alvaro@ucenfotec.ac.cr',
		password:'123',
		categoria:'profesor',
		estado:'activo'
	},
	{
		nombre:'Juan Pérez Padilla',
		genero:'masculino',
		correo:'juan@ucenfotec.ac.cr',
		password:'123',
		categoria:'estudiante',
		estado:'inactivo'
	 }

	];


//Arreglo Carreras//
	var arregloCarreras =[
	{
		id:0,
		codigo:0,	
		nombre:'Desarrollo y Diseño Web',
		estado:'activo',
		cursos: [
		{
			id:0,
			idCurso: 0,
			nombreCurso: 'Proyecto 1'
			
		},
		{
			id:1,
			idCurso: 1,
			nombreCurso: 'Web 2'
			
		},
		]

	},
	{
		id:1,
		codigo:1,	
		nombre:'Desarrollo de software',
		estado:'inactivo',
		cursos: [
		{
			id:0,
			idCurso: 0,
			nombreCurso: 'Programacion 1'
			
		},
		{
			id:1,
			idCurso: 1,
			nombreCurso: 'Programacion 2'
			
		},
		]
	 },
	 {
	 	id:2,
	 	codigo:2,	
		nombre:'Inglés',
		estado:'inactivo',
		cursos: [
		{
			id:0,
			idCurso: 0,
			nombreCurso: 'Ingles 1'
			
		},
		{
			id:1,
			idCurso: 1,
			nombreCurso: 'Ingles 2'
			
		},
		]
	 }

	];




})();