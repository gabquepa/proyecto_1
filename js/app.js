(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project', 'ngCookies']);



	app.controller('configController', ['$scope', '$http', function($scope, $http){
		  // var arregloUsuarios = [];
		  // this.usuarios = arregloUsuarios;
		  store = this;
		  this.usuarios =[];
		  this.comentariosDenuncia=[];
		  this.postsDenuncia=[];
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
		  	$http.post("/Proyecto_1/php/global/muestra_profesores.php").success(function(data, status) {
				store.usuarios = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});

			$http.post("/Proyecto_1/php/global/muestra_carreras.php").success(function(data, status) {
				store.carreras = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});

			$http.post("/Proyecto_1/php/configuration/muestra_comentarios_reportados.php").success(function(data, status) {
				store.comentariosDenuncia = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});

			$http.post("/Proyecto_1/php/configuration/muestra_posts_reportados.php").success(function(data, status) {
				store.postsDenuncia = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});



			
         
		this.addCarrera = function(){
		    var nomCarrera = $('#nomCarrera').val();
		     if (nomCarrera.trim() == '') {
		     	 alertify.log("Debe completar todos los campos");
		     }else{
				$http.post("/Proyecto_1/php/configuration/crea_carrera.php", { "nombre" : nomCarrera,  "estado" : '1', "thumb" : "test.png"
				}).
				success(function(data, status) {
					alertify.success("La carrera fue creada correctamente");
					$http.post("/Proyecto_1/php/global/muestra_carreras.php").success(function(data, status) {
						store.carreras = data;
					}).error(function(data, status) {
						alertify.error("Error");
					});
					limpiar();
				})
				.
				error(function(data, status) {
					alertify.error("Error");
				});
			 }
		};
		this.modifCarrera= function(){
			$http.post("/Proyecto_1/php/configuration/muestra_carrera.php", { "id_carrera" : $('.select-carrera').val()
			}).
			success(function(data, status) {
				for(var i= 0; i<data.length;i++){
					$('#mcodCarrera').val(data[i].id_carrera);
					$('#mnomCarrera').val(data[i].nombre);
					if(data[i].estado ==1){
			 			$('#activo-carrera').prop('checked', true);
			 		}
			 		else{
			 			$('#inactivo-carrera').prop('checked', true);
			 		}
				}	
			})
			.
			error(function(data, status) {
				alertify.error("Error");
			});
		};
		  this.actualizarCarrera= function(){
		  	var codCarrera = $('#mcodCarrera').val();
            var nomCarrera = $('#mnomCarrera').val();
             if (codCarrera.trim() == '' || nomCarrera.trim() == '' ) {
             	 alertify.log("Debe completar todos los campos");
             }else{
             	alertify.confirm("¿Está seguro que desea enviar los cambios?", function (e) {
					if (e) {
					    $http.post("/Proyecto_1/php/configuration/modifica_carrera.php", { 
							"id_carrera" : codCarrera,
							"nombre" : nomCarrera,
							"estado" : $('input:radio[name="estado-carrera"]:checked').attr('val')
						}).
						success(function(data, status) {
							alertify.success("Cambio guardado");
							limpiar();
						})
						.
						error(function(data, status) {
							alertify.error("Error");
						});
					}
				});
			}
		  }//Fin FUncion
		  this.selectCurso = function(){
		  	var id_carrera = $('.select-carrera-modificarCurso').val();
			$http.post("/Proyecto_1/php/global/muestra_cursos.php",{ 			
				"id_carrera" : id_carrera
			}).success(function(data, status) {
				store.cursosCarrera=data;
			}).error(function(data, status) {
				alertify.error("Error");
			});
		  };
		  this.selectCurso2 = function(){
		  	var id_carrera = $('.select-carrera-asignaprofe').val();
			$http.post("/Proyecto_1/php/global/muestra_cursos.php",{ 			
				"id_carrera" : id_carrera
			}).success(function(data, status) {
				store.cursosCarrera=data;
			}).error(function(data, status) {
				alertify.error("Error");
			});
		  };
		  this.selectCurso3 = function(){
		  	var id_carrera = $('.select-carrera-asignaest').val();
			$http.post("/Proyecto_1/php/global/muestra_cursos.php",{ 			
				"id_carrera" : id_carrera
			}).success(function(data, status) {
				store.cursosCarrera=data;
			}).error(function(data, status) {
				alertify.error("Error");
			});
		  };
		  this.crearCurso= function(){
             var codCurso = $('#codCurso').val();
             var nomCurso = $('#nomCurso').val();
             if (codCurso.trim() == '' || nomCurso.trim() == '' || $.isNumeric($('.select-carrera-creaCurso').val()) == false) {
             	alertify.log("Debe completar todos los campos");
             }else{
          		$http.post("/Proyecto_1/php/configuration/crea_curso.php", { 
				"id_curso" : codCurso,
				"id_carrera" : $('.select-carrera-creaCurso').val(), 
				"nombre" : nomCurso,
				"estado" : 1
				}).
				success(function(data, status) {
					alertify.success("El curso fue creado correctamente");
					store.selectCurso();
					store.modifCurso();
					setTimeout(function(){
						limpiar();
					}, 500);
					// limpiar();
				})
				.
				error(function(data, status) {
					alertify.error("Error");
				});  
		  	}
		   }	
 			this.getCurso = function(){	
		  		// return this.miCarreraMC.cursos;
		 	 }

		   this.modifCurso= function(){
		   		$http.post("/Proyecto_1/php/configuration/muestra_curso.php", { "id_curso" : $('.select-curso-modificarCurso').val()
				}).
				success(function(data, status) {
					for(var i= 0; i<data.length;i++){
						$('#modifIdCurso').val(data[i].id_curso);
				  		$('#modifNombreCurso').val(data[i].nombre);
						if(data[i].estado ==1){
				 			$('#activo-curso').prop('checked', true);
				 		}
				 		else{
				 			$('#inactivo-curso').prop('checked', true);
				 		}
					}	
				})
				.
				error(function(data, status) {
					alertify.error("Error");
				});
		  }// Fin Funcion

		  this.actualizarCurso= function(){		  	 
             var nomCurso = $('#modifNombreCurso').val();

             if (nomCurso.trim() == '') {
             	alertify.log("Debe completar todos los campos");
             }else{
             	alertify.confirm("¿Está seguro que desea enviar los cambios?", function (e) {
					if (e) {
						$http.post("/Proyecto_1/php/configuration/modifica_curso.php", { 
							"nombre" : nomCurso,
							"estado" : $('input:radio[name="estado-curso"]:checked').attr('val'),
							"id_curso" : $('#modifIdCurso').val()
						}).
						success(function(data, status) {
							alertify.success("Cambio guardado");
							store.selectCurso();
							store.modifCurso();
							setTimeout(function(){
								limpiar();
							}, 500);
						})
						.
							error(function(data, status) {
								alertify.error("Error");
							});
					
					}
				});
			
			}
		  }
		  this.comentarioIgnora = function(id){
		  	alertify.confirm("¿Esta seguro que desea ignorar el comentario?", function (e) {
			    if (e) {
			   		$http.post("/Proyecto_1/php/configuration/comentarios_reportados_ignorar.php", { 
						"id_comentario_foro" : id
					}).
					success(function(data, status) {
						alertify.success("El comentario se ha ignorado");
						setTimeout(function(){
							store.comentarioLista();
						}, 500);
					})
					.
					error(function(data, status) {
						alertify.error("Error");
					});     
			    } 
			});
		  }
		  this.comentarioBorra = function(id){
		  	alertify.confirm("¿Esta seguro que desea eliminar el comentario?", function (e) {
			    if (e) {
			   		$http.post("/Proyecto_1/php/configuration/comentarios_reportados_eliminar.php", { 
						"id_comentario_foro" : id
					}).
					success(function(data, status) {
						alertify.success("El comentario se ha eliminado");
						setTimeout(function(){
							store.comentarioLista();
						}, 500);
						
					})
					.
					error(function(data, status) {
						alertify.error("Error");
					});     
			    } 
			});		
		  }
		  this.comentarioLista = function(){
		  	$http.post("/Proyecto_1/php/configuration/muestra_comentarios_reportados.php").success(function(data, status) {
				store.comentariosDenuncia = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});

			$http.post("/Proyecto_1/php/configuration/muestra_posts_reportados.php").success(function(data, status) {
				store.postsDenuncia = data;
			}).error(function(data, status) {
				alertify.error("Error");
			});
		  }
		  ////////////
		  this.postIgnora = function(id){
		  	alertify.confirm("¿Esta seguro que desea ignorar el comentario?", function (e) {
			    if (e) {
			   		$http.post("/Proyecto_1/php/configuration/posts_reportados_ignorar.php", { 
						"id_comentario_post" : id
					}).
					success(function(data, status) {
						alertify.success("El comentario se ha ignorado");
						setTimeout(function(){
							store.comentarioLista();
						}, 500);
					})
					.
					error(function(data, status) {
						alertify.error("Error");
					});     
			    } 
			});
		  }
		  this.postBorra = function(id){
		  	alertify.confirm("¿Esta seguro que desea eliminar el comentario?", function (e) {
			    if (e) {
			   		$http.post("/Proyecto_1/php/configuration/posts_reportados_eliminar.php", { 
						"id_comentario_post" : id
					}).
					success(function(data, status) {
						alertify.success("El comentario se ha eliminado");
						setTimeout(function(){
							store.comentarioLista();
						}, 500);
						
					})
					.
					error(function(data, status) {
						alertify.error("Error");
					});     
			    } 
			});		
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





	// var arregloUsuarios =[
	// {
	// 	nombre:'Álvaro Cordero Peña',
	// 	genero:'masculino',
	// 	correo:'alvaro@ucenfotec.ac.cr',
	// 	password:'123',
	// 	categoria:'profesor',
	// 	estado:'activo'
	// },
	// {
	// 	nombre:'Juan Pérez Padilla',
	// 	genero:'masculino',
	// 	correo:'juan@ucenfotec.ac.cr',
	// 	password:'123',
	// 	categoria:'estudiante',
	// 	estado:'inactivo'
	//  }

	// ];


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