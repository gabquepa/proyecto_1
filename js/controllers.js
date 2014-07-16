/* Controllers */

/************** Forum Controllers **************/

(function(){
var app = angular.module('controllers-project',[]);

app.controller('ForumController', ['$scope', '$http', function($scope, $http){
	var forum = this;
	forum.lists=[];
	$scope.enable = true;
	$scope.showForum=false;
	$scope.showList=true;

	$http.get('/Proyecto_1/JSON/forums.json').success(function(data){
		for(var i= 0; i<data.length;i++){
			console.log('el profesor: ' +data[i].profesor);	
			// if()
			forum.lists = data;
		}
	});

	this.displayForum = function(forum){
		// $scope.$apply(function(){
            $scope.showForum=true;
			$scope.showList=false;
        // });
		
		$('#course-title').text(forum.titulo);
		$('.inine-forum-list').addClass('ng-hide');
		$('.main-forum').val(forum.tema);
		$('.inine-forum-display').removeClass('ng-hide');
		$('.moderador').val(forum.moderador);
		var invi=[];
		for(var i= 0; i<(forum.invitados).length;i++){
			if (invi !='') {
				invi = invi+ ', ' +((forum.invitados)[i].email);	
			}else{
					invi = ((forum.invitados)[i].email);	
			}	
		}
		$('.invitados').val(invi);	

		
		// for(var i= 0; i<(forum.comments).length;i++){
			
		// }
		if((forum.comments).length != 0){
			$scope.comments= forum.comments;
		}
	};
	this.hideForum = function(){
		$scope.showForum=true;
		$scope.showList=false;
		$('.inine-forum-list').removeClass('ng-hide');
		$('.inine-forum-display').addClass('ng-hide');
	};

	this.enableTxt  = function(){
		if($scope.enable = true && $(".main-forum").attr('disabled')==='disabled'){
			$scope.enable = false;
			$('.main-forum').attr('disabled',false);	
		}
		else{
			$scope.enable = true;
			$('.main-forum').attr('disabled',true);	
		}
		
	};
	this.addToForum = function(){
		var invitados = $('.invitados').val().split(', ');
		$('#moderadorDisplay').text($('.moderador').val());
		for (var i = invitados.length - 1; i >= 0; i--) {
			$('#invitadosDisplay').append('<li> <span ng-click="forum.remove()" class="glyphicon glyphicon-remove delete"></span>'+invitados[i]+'</li>')
		}
	};
	this.remove = function(){
		console.log('remove');
	};
}]);	

app.controller('CarrerasController', ['$http', function($http){
	var universidad = this;
	universidad.carreras=[];
	$http.get('/Proyecto_1/JSON/carreras.json').success(function(data){
		universidad.carreras = data;
	});

	this.selectCurso = function(){
		var carrera = $('.select-carrera option:selected').attr('val');
		var cursos = this;
		universidad.cursos=[];
		
		if(carrera ==="1"){
			$http.get('/Proyecto_1/JSON/cursosDW.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="2"){
			$http.get('/Proyecto_1/JSON/cursosDS.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="3"){
			$http.get('/Proyecto_1/JSON/cursosInT.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else{
			universidad.cursos = '';
		}

	};
}]);	

/********************************************CONTROLADORES********************************************************/

app.controller('configurationController', function(){
		
		this.tab = 1;
		this.selectTab=function(setTab){			
			this.tab = setTab;

			
		};
		this.isSelected = function(checkedTab){
			return this.tab ===checkedTab;
		};




	});
/*****************************************************************************************************************/

app.controller('usuarioController', function(){
		this.tab = 1;		
		this.selectTab=function(setTab){		
				this.tab = setTab;			
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 1){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});
/*****************************************************************************************************************/
app.controller('foroController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 2){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});
/*****************************************************************************************************************/	
app.controller('denunciasController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 3){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});

/*****************************************************************************************************************/	
app.controller('carreraController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 4){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});
/*****************************************************************************************************************/	
app.controller('cursoController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 5){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});
/*****************************************************************************************************************/	
app.controller('profesorController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 6){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});
/*****************************************************************************************************************/	
app.controller('estudianteController', function(){
		this.tab = 1;
		this.selectTab=function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 7){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});

//Termina Alejandro Zuñiga

//Controllers Keilyn Sibaja
app.controller('misCarreras-cursos',['$http', function($http){
	var controller = this;
		controller.carrerasycursos= [];

		$http.get('/proyecto_1/JSON/carreras-cursos.json').success(function(data){
			controller.carrerasycursos =data;
		});

		controller.cursos=[];

		controller.carreraSelect=function(carreraSelect){
			for(var i=0; i<controller.carrerasycursos.length; i++){

				if(controller.carrerasycursos[i].carrera===carreraSelect){
					controller.cursos=controller.carrerasycursos[i].cursos;
					break;
				}
			}
		}
}]);

app.controller('editarComentController',function(){
	this.value=false;

	this.editarComent=function(){

		//false esconder ----- true mostrar
		
		if(this.value===false){
			return this.value=true;
		}

		if(this.value===true){
			return this.value=false;
		}
	}
});
app.controller('buscarDocController',function(){//Controlador de mi seccion de Buscar Documento

	//1=esconder 2=mostrar

	this.value=1;

	this.showBtn=function(){//Muestra o esconde el boton 

		if(this.value===1){
			return this.value=2
		};

		if(this.value===2){
			return this.value=1
		};


		}
}); 

app.controller('subirDocController',function(){//Controlador de mi seccion Subir Documento
	
	//1=esconder 2=mostrar

	this.value=1;

	this.showBtn=function(){//Muestra o esconde el boton 

		if(this.value===1){
			return this.value=2
		};

		if(this.value===2){
			return this.value=1
		};


		}
});

app.controller('topDocController',['$http', function($http){ //controlador de mi seccion top de documentos
		var docTop = this;
		docTop.librosTop= [];

		$http.get('/proyecto_1/JSON/topDoc.json').success(function(data){
			docTop.librosTop =data;
		});
}]);

app.controller('historialDesController',['$http', function($http){//controlador de mi seccion historial de descarga
		var docDesc = this;
		docDesc.descargas= [];

		$http.get('/proyecto_1/JSON/historialDescargas.json').success(function(data){
			docDesc.descargas =data;
		});
}]);
//Controllers Keilyn Sibaja

//Sergio Herrera Durán----------------------------------------------

//controlador recive json de usuarios
app.controller('UserController',['$http',function($http){
		var store = this;
		store.user=[];
		$http.get('/proyecto_1/JSON/usuariosTestSergio.json').success(function(data){ //
			store.user = data;
		});
}]);

//controlador valida info de usuarios para ingresar al sistema
app.controller('validarLogin', ['$cookieStore',function($cookieStore){
		this.pass="";
		this.name="";/*GABY*/
		
		this.testUser= function(pName,pPass, pUsuario){
			var estado=false;
			for (var i=0; i < pUsuario.length; i++) {
			  if (pPass==pUsuario[i].pass && pName==pUsuario[i].usuario) {
				if (pUsuario[i].estado=="A") {
		        	   $('#mensajeLogin').html("");
		        	   $cookieStore.put('usuario', i);
		        	   window.location = "/Proyecto_1/user-blog1.html";
				} else{
					$('#mensajeLogin').html("");
					$('#mensajeLogin').append('Acceso Denegado <br> USUARIO INACTIVO');
					$("#usuario").val("");
					$("#pass").val("");	
				};	
                 estado=true;	   
			   };
			   
			};
			if (!estado) {
				$('#mensajeLogin').html("");
				$('#mensajeLogin').append('Usuario o Contraseña Inválida');
				$("#usuario").val("");
				$("#pass").val("");
			};
	   };
	}]);
	
	
//controlador recupera cuenta de ususarios
	app.controller('recuperarPass', function(){
		this.name="";
		
		this.recUser= function(pName,pUsuario){
			var estado=false;
			for (var i=0; i < pUsuario.length; i++) {
			  if (pName==pUsuario[i].usuario) {
				if (pUsuario[i].estado=="A") {
		        	   $('#mensajeRec').html("");
		        	   $('#mensajeRec').append(pUsuario[i].nombre + '<br>' + 'se envión un correo a su cuanta:'+'<br>'+pUsuario[i].usuario+'<br>'+'con su nueva contraseña');
				} else{
					$('#mensajeRec').html("");
					$('#mensajeRec').append('USUARIO INACTIVO');
					$("#usuarioRec").val("");
				};	
                 estado=true;	   
			   };
			   
			};
			if (!estado) {
				$('#mensajeRec').html("");
				$('#mensajeRec').append('USUARIO INCORRECTO');
				$("#usuarioRec").val("");
			};
			
		
	   };
	});
	
//controlador muestra y oculta contenedores del login
	app.controller('controlLogin', function(){
		this.tablog = 1;
		
		this.getTab=function(getTab){
			this.tablog = getTab;
			limpiarForms();
		};
		//this.regresarb=function(){
			//this.tablog = 1;
		//};
		
		this.isSelected = function(checkedTab, pTab){
			//	if(pTab != 0){
				//	this.tablog=0;
			//	}

			return this.tablog ===checkedTab;
			
		};
		
		function limpiarForms () {
		   $('#mensajeRec').html("");
			$('#mensajeLogin').html("");
			$("#usuarioRec").val("");
			$("#usuario").val("");
			$("#pass").val("");	
		}
		
		
		
	});
	


//Termina Sergio Herrera Durán----------------------------------------------






})();