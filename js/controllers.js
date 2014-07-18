/* Controllers */



(function(){
var app = angular.module('controllers-project',[]);

/************** Route Controllers **************/
app.controller('routeController', function($scope, $cookieStore) {
	var tipo = $cookieStore.get('usuarioTipo');
	if(tipo==='P'){
		$('.headForum').attr('href', '/Proyecto_1/forum-profesor.html');
	}
	if(tipo==='E'){
		$('.headForum').attr('href', '/Proyecto_1/forum-estudiante.html');
	}
	if(window.location.pathname === '/Proyecto_1/forum-profesor.html' || window.location.pathname === '/Proyecto_1/forum-estudiante.html' || window.location.pathname === '/Proyecto_1/forum-search.html'){
		$('.forumOpt').addClass('active');
	}
});



/************** Forum Controllers **************/

/************** PROFESOR Forum Controllers **************/
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

		if((forum.comments).length > 1){
			$scope.comments= forum.comments;
			$('.comments-lst').show();
		}else{
			$('.comments-lst').hide();
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
		$.find('#moderadorDisplay').text($('.moderador').val());
		for (var i = invitados.length - 1; i >= 0; i--) {
			$('#invitadosDisplay').append('<li> <span ng-click="forum.remove()" class="glyphicon glyphicon-remove delete"></span>'+invitados[i]+'</li>')
		}
	};

	this.remove = function(){
		console.log('remove');
	};

	this.showCreateForum = function(){
		$scope.showCreate = true;
		$scope.showConfig=false;
		$('.forum-config').addClass('ng-hide');
		$('.forum-create').removeClass('ng-hide');
	};
	this.denunciar = function(){
		alert('su denuncia ha sido enviada');
	};
	this.createForum = function(){
		var arregloInvitados={}; 
		this.newforum={};
		var invitados = $('.create-forumSection .invitados').val().split(', ');

		for (var i = invitados.length - 1; i >= 0; i--) {
			invitados[i] = 'nombre":'+ '"' + invitados[i];
		}

		this.newforum.id=(forum.lists).length+1;
		this.newforum.profesor="0001";
		this.newforum.titulo= $('.forum-title').val();
		this.newforum.periodo=$('.forum-periodo').val();
		this.newforum.CarreraId=$('.select-carrera option:selected').attr('val');;
		this.newforum.CursoId=$('.select-curso option:selected').attr('val');
		this.newforum.tema=$('.create-forumSection textarea').val();
		this.newforum.moderador=$('.create-forumSection .moderador').val();
		this.newforum.invitados = invitados;
		this.newforum.comments={};
		
		forum.lists.push(this.newforum);
		newforum={};
		console.log(forum.lists); 

		alert('Foro creado');

		$scope.showCreate = false;
		$scope.showConfig=true;
		$('.forum-config').removeClass('ng-hide');
		$('.forum-create').addClass('ng-hide');

	};

}]);	

/************** ESTUDIANTE Forum Controllers **************/
app.controller('StudentForumController', ['$scope', '$http', function($scope, $http){
	var forum = this;
	forum.lists=[];
	$http.get('/Proyecto_1/JSON/forums.json').success(function(data){
		for(var i= 0; i<data.length;i++){
			// if()
			forum.lists = data;
		}
	});

	this.displayForum = function(forum){
		$('.course').text(forum.CursoId);
		$('.course-title').text(forum.titulo);
		$('.main-forum').text(forum.tema);

		if((forum.comments).length > 1){
			$scope.comments= forum.comments;
			$('.comments-lst').show();
		}else{
			$('.comments-lst').hide();
		}
	};
	this.denunciar = function(){
		alert('su denuncia ha sido enviada');
	};
	this.buscarForo = function(){
		$('.forum-search div .loading').show();
		setTimeout(function(){
			$('.forum-search div .loading').hide();
			$scope.showForumList=true;
			$('.Foro-lst').removeClass('ng-hide');
		}, 3000);


	};

}]);

/************** HERRAMIENTAS **************/

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
		// this.getTab=function(getTab){
		// 	$('#mensajePerfil').html("");
		// 	this.tabperfil = getTab;
		// 	limpiarForms();
		// 	if (getTab==1) {
		// 		$('#infuser').attr('class',"btn activetab");
		// 		$('#changepass').attr('class',"btn profBtn");
		// 	} else{
		// 		$('#infuser').attr('class',"btn profBtn");
		// 		$('#changepass').attr('class',"btn activetab");
		// 	};
				
		// };
		
		if(carrera ==="1"){
			$http.get('/Proyecto_1/JSON/cursosDW.json').success(function(data){
				universidad.cursos = data;
				$('#confNavBtn1').attr('class',"btn activetab");
				// $('#changepass').attr('class',"btn profBtn");
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
		else if(carrera ==="4"){
			$http.get('/Proyecto_1/JSON/cursosT.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="5"){
			$http.get('/Proyecto_1/JSON/cursosCS.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="6"){
			$http.get('/Proyecto_1/JSON/cursosBD.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="7"){
			$http.get('/Proyecto_1/JSON/cursosI.json').success(function(data){
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


/*****************************************************************************************************************/	
app.controller("crearUserController", function(){

		this.user = {};

		this.addUser = function(pUser){
			  // console.log(pUser.correo);
			  console.log(this.user);

			  this.user.estado = "activo";
			pUser.push(this.user);

			 
			 console.log(this.user);
			//  console.log(pUser[0].nombre);
			//  console.log(pUser[1].nombre);
			//  console.log(pUser[2].nombre);
			
			this.user = {};	
		};

	});
/*****************************************************************************************************************/	
app.controller("modificarUserController", function(){
		  var temp = 0;	

		  
		this.modifUser = function(pUser, pCorreo){
			
			 for(i=0;i<pUser.length;i++){
			 	if(pUser[i].correo === pCorreo){
			 		temp = i;
			 		console.log(temp);
			 		$('#nombreEncontrado').val(pUser[i].nombre);
			 		$('#correoEncontrado').val(pUser[i].correo);
			 		$('#passwordEncontrado').val(pUser[i].password);
			 		if(pUser[i].genero ==='masculino'){
			 			$('#generoHombre').attr('checked', 'checked');
			 		}
			 		else{
			 			$('#generoMujer').attr('checked', 'checked');
			 		}
			 		//If de categoria
			 		if(pUser[i].categoria ==='estudiante'){
			 			$('#estudiante').attr('checked', 'checked');
			 		}
			 		else if(pUser[i].categoria ==='profesor'){
			 			$('#profesor').attr('checked', 'checked');
			 		}else if(pUser[i].categoria ==='rector'){
			 			$('#rector').attr('checked', 'checked');
			 		}else if(pUser[i].categoria ==='director'){
			 			$('#director').attr('checked', 'checked');
			 		}		 		
			 	}//FIn del if
			 }//Fin del for	


		};//Fin de funcion

		this.user = {};
		this.saveModif = function(pModif){
			// console.log(this.user);
			// console.log(temp);

			// console.log(pModif[temp].nombre);
			 pModif[temp] = this.user;
			 // console.log(pModif[temp].nombre);
			  console.log(pModif[temp]);
			

			 this.user = {};


		}

	});

/*****************************************************************************************************************/	
app.controller("inhabilitarUserController", function(){
			var temp = 0;
			// var estado = true;

			this.buscaUser = function(pUser, pCorreo){
				 // console.log(pCorreo);
			
			 for(i=0;i<pUser.length;i++){
			 	if(pUser[i].correo === pCorreo){
			 		console.log(i);
			 		temp = i;
			 		if(pUser[i].estado === "activo"){
			 			console.log(pUser[i].estado);
			 			// console.log(pUser[i].nombre);
			 			$('#nombreUser').html(pUser[i].nombre);
			 			$('#correoUser').html(pUser[i].correo);
			 			$('#activo').attr('checked', 'checked');

			 		}else{
			 			console.log(pUser[i].estado);
			 			$('#nombreUser').html(pUser[i].nombre);
			 			$('#correoUser').html(pUser[i].correo);
			 			$('#inactivo').attr('checked', 'checked');

			 		}
			 		
			 	}else{}



			 	}
			 }

			 this.user = {};
			 this.inaUser = function(pModif){
			 	// console.log('test');
			 	// console.log(this.user);
			 	pModif[temp] = this.user.estado;
			 	console.log(pModif[temp]);
			 	if(pModif[temp].estado === "activo"){
			 		$('#activo').attr('checked', 'checked');
			 		console.log('entro');
			 	}else{
			 		$('#inactivo').attr('checked', 'checked');
			 		console.log('no entro');
			 	}
			 	 
			

			 this.user = {};


			 }
			 		

});
/*****************************************************************************************************************/	
app.controller("crearCarreraController", function(){

		this.carrera = {};

		this.addCarrera = function(pCarrera){
			  
			this.carrera.estado = "activo";  
			pCarrera.push(this.carrera);

			 
			 //  console.log(this.carrera);
			 console.log(pCarrera[0].nombre);
			 console.log(pCarrera[1].nombre);
			 console.log(pCarrera[2].nombre);
			 console.log(pCarrera[3].nombre);
			
			this.carrera = {};	
		};

	});
/*****************************************************************************************************************/	
app.controller("inhabilitarCarreraController", function(){

		this.validarCarrerasAct = function(pCarrera){
			  			 
			 	if(pCarrera === "activo"){
			 		return true;
			 		
			 	}else{
			 		return false;
			 		
			 	}
			 			 
		};
		this.validarCarrerasIna = function(pCarrera){
			  			 
			
			 	if(pCarrera === "inactivo"){
			 		return true;
			 		
			 	}else{
			 		return false;
			 		
			 	}

		};

		this.codigo = {};
		this.saveValidInvalid = function(pCarreras, pCodigo, pEstado){
				
			  console.log(pCodigo);
			for(i=0;i<pCarreras.length;i++){
				if(pCarreras[i].codigo==pCodigo){
					if(pEstado == "activo"){
						pCarreras[i].estado="inactivo";
					}else{
						pCarreras[i].estado="activo";

					}

				}


			}
			  this.codigo = {};
		}


	

	});
/*****************************************************************************************************************/	


/*****************************************************************************************************************/	
app.controller("respuestaForos", function(){
	var respuestaForo = true;

	this.respDefault = function(){
		if(respuestaForo){
		$('#permitirRespuesta').attr('checked', 'checked');
		}else{
			$('#denegarRespuesta').attr('checked', 'checked');
		}
	}

	this.cambiarRespuesta = function(){
		console.log('cambiar');
		var resp = $('#denegarRespuesta').val();
		if(resp === 'noPermitir'){
			$('#denegarRespuesta').attr('checked', 'checked');
			respuestaForo = false;
		}
		// console.log(resp);


	}





});
//Termina Alejandro Zuñiga

//Controllers Keilyn Sibaja
app.controller('agregarDocController',['$http', function($http){
	var controller = this;
		controller.documentos= [];

		$http.get('/proyecto_1/JSON/docs.json').success(function(data){
			controller.documentos =data;
		});

		this.addDoc={};

		this.datosDoc=function(){
			this.addDoc.votacion=0;
			controller.documentos.push(this.addDoc);
			alert(controller.documentos[5].nombre);
			this.addDoc={};
		}

		this.busqueda=function(){
			var h=arguments;
			for(var i=0; i<controller.documentos.length; i++){
				var doc=controller.documentos[i];

				if(doc.nombre.toUpperCase()===arguments[0].toUpperCase() && 
					doc.carrera.toUpperCase()===arguments[1].toUpperCase() && 
					doc.curso.toUpperCase()===arguments[2].toUpperCase()){

					
					break;
				}
			}
		}

}]);

app.controller('seccionDocumentosShow', function(){
	
	this.tab=1;

	this.mostrarSecc=function(pTab){
		if(pTab==1){
			this.tab=1;
		}
		if(pTab==2){
			this.tab=2;
		}
	}
});

app.controller('misCarreras-cursos',['$http', function($http){

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
		else if(carrera ==="4"){
			$http.get('/Proyecto_1/JSON/cursosT.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="5"){
			$http.get('/Proyecto_1/JSON/cursosCS.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="6"){
			$http.get('/Proyecto_1/JSON/cursosBD.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else if(carrera ==="7"){
			$http.get('/Proyecto_1/JSON/cursosI.json').success(function(data){
				universidad.cursos = data;
			});
		}
		else{
			universidad.cursos = '';
		}

	};
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

app.controller('historialDesController',['$http', function($http){//controlador de mi seccion historial de descarga
		var docDesc = this;
		docDesc.descargas= [];

		console.log('Test');

		$http.get('/proyecto_1/JSON/docs.json').success(function(data){
			docDesc.descargas =data;
			console.log(data);
		});
}]);
//Controllers Keilyn Sibaja

//Sergio Herrera Durán----------------------------------------------

//controlador recive json de usuarios
app.controller('UserController',['$http',function($http){
		var store = this;
		store.user=[];
		store.carreras=[];
		$http.get('/proyecto_1/JSON/carreras-cursos-usuario-Sergio.json').success(function(data){ //
			store.carreras = data;
		});
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
		        	   $cookieStore.put('usuarioTipo', pUsuario[i].tipo);

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
	   
	    this.logOut = function(){
			$cookieStore.remove("usuario");
			$cookieStore.remove("usuarioTipo");
			window.location = "/Proyecto_1/login.html";
			
	    };
	   
	}]);	
	
//controlador recupera cuenta de ususarios
	app.controller('recuperarPass', function(){
		this.name="";
		
		this.recUser= function(pName,pUsuario){
			var estado=false;
			for (var i=0; i < pUsuario.length; i++) {
			  if (pName==pUsuario[i].usuario) {
		        	   $('#mensajeRec').html("");
		        	   $('#mensajeRec').append(pUsuario[i].nombre + '<br>' + 'se envión un correo a su cuanta:'+'<br>'+pUsuario[i].usuario+'<br>'+'con su nueva contraseña');
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
	
	
//controlador muestra y oculta contenedores del perfil
	app.controller('controlPerfil', function(){
		this.tabperfil = 1;
		
		this.getTab=function(getTab){
			$('#mensajePerfil').html("");
			this.tabperfil = getTab;
			limpiarForms();
			if (getTab==1) {
				$('#infuser').attr('class',"btn activetab");
				$('#changepass').attr('class',"btn profBtn");
			} else{
				$('#infuser').attr('class',"btn profBtn");
				$('#changepass').attr('class',"btn activetab");
			};
				
		};

		this.isSelected = function(checkedTab, pTab){
			//	if(pTab != 0){
				//	this.tablog=0;
			//	}

			return this.tabperfil ===checkedTab;
			
		};
		this.pass={};
		this.cambiarPass = function(pPassAct){	
        	
        	if (this.pass.pactual==pPassAct) {
        		if (this.pass.pnew==this.pass.pnewconf) {
        			$('#mensajePerfil').html("");
        			$('#mensajePerfil').append("Su contraseña se cambió con éxito");
        			return 	this.pass.pnewconf;
        		} else{
        			$('#mensajePerfil').html("");
        			$('#mensajePerfil').append("La confirmación es incorrecta");
        			return 	pPassAct;
        		};
        		
        		
        	} else{
        		$('#mensajePerfil').html("");
        		$('#mensajePerfil').append("Contraseña inválida");
                return 	pPassAct;        	
        	};
        	
        
			this.pass={};
			
		};
		
		
		function limpiarForms () {
		   $('#passuser').val("");
			$('#newpass').val("");
			$("#confirmnew").val("");
		}
		
		
		
	});
	
	
	//controlador muestra y oculta contenedores del blogs
	app.controller('controlBlog', function(){
		this.tabblog ="b1";
		this.tabblogTipo="";
		if (this.tabblog=="b1") { 
				$("#styleTemp").append('#blogsUser1{background-color: #ebebeb;border-left: 5px #00a79c solid;padding-left:22.5%}');
		}; 
		this.getTab=function(getTab){
			this.tabblog = getTab;
			if (this.tabblog=="b1") { 
				$("#styleTemp").html("");	
				$("#styleTemp").append('#blogsUser1{background-color: #ebebeb;border-left: 5px #00a79c solid;padding-left:22.5%}');
			} else{
				$("#styleTemp").html("");
				$("#styleTemp").append('#blogsUser2{background-color: #196A95 !important;}');	
			};
			//limpiarForms();
		};
		
		
		this.isSelected = function(checkedTab){
			return this.tabblog ===checkedTab;	
		};

		
		
	});


//controlador muestra y oculta contenedores dentro del blogs
	app.controller('controlBlog', function(){
		this.tabblog ="b1";
		this.tabblogIn =1;
		this.blogtemp =0;
		if (this.tabblog=="b1") { 
				$("#styleTemp").append('#blogsUser1{background-color: #ebebeb;border-left: 5px #00a79c solid;padding-left:22.5%}');
		}; 
		this.getTab=function(getTab){
			this.tabblog = getTab;
			if (this.tabblog=="b1") { 
				$("#styleTemp").html("");	
				$("#styleTemp").append('#blogsUser1{background-color: #ebebeb;border-left: 5px #00a79c solid;padding-left:22.5%}');
			} else{
				$("#styleTemp").html("");
				$("#styleTemp").append('#blogsUser2{background-color: #196A95 !important;}');	
				this.tabblogIn =3;
			};
			//limpiarForms();
		};
		
		this.getTabIn=function(getTab,pidBlog,puser){
            $("#divEditarPost").show();        
            this.tabblogIn = getTab;
           for (var i=0; i < puser.blog.length; i++) {
			  if (puser.blog[i].idPost==pidBlog) {
	    		 this.blogtemp=i;
	    	  };
			};
         };  
         this.regresar=function(getTab){  
            this.tabblogIn = getTab;		
			//limpiarForms();
		};
		
		
		this.isSelected = function(checkedTab){
			return this.tabblog ===checkedTab;	
		};
		
		this.isSelectedIn = function(checkedTab){
			return this.tabblogIn ===checkedTab;	
		};

		this.miBlog = function(){
			return this.blogtemp;	
		};
		
	});
	
	app.controller("AddBlogController",function(){
		var cont=2;
		this.newblog={};
		this.coment={};
	    this.addPost = function(puser){	
			this.newblog.idPost=cont;
			this.newblog.comentarios=[];
			//this.coment.idComentario=2;
			//this.coment.Participante="sergio";
			//this.coment.texto="hola";
			puser.blog.push(this.newblog);
			//puser.blog[cont].comentarios.push(this.coment);
			this.newblog={};
			cont++;
	    };
	    
	});
	
	app.controller("deletePostUser",function(){
	    
	    this.deletePost = function(postid,puser){
	    	for (var i=0; i < puser.blog.length; i++) {
			  if (puser.blog[i].idPost==postid) {
	    		 puser.blog.splice( i , 1 );
	    	  };
			};
			$("#divEditarPost").hide();

	    };
	    
	});
	
	app.controller("addComent",function(){
	    var cont=2;
		this.newCom={};

	    this.addComt = function(pIdPost,pPart,pDueño){	
			this.newCom.idComentario=cont;
			this.newCom.Participante=pPart;
            pDueño.blog[pIdPost].comentarios.push(this.newCom);
      
			this.newCom={};
			cont++;
	    };    
	});
	
	
	app.controller("buscarUser",function(){
	   this.tempDuenio="";
	   this.tempEstadoCurso=true;
	   this.tempEstadoUsuario=true;
	   this.styleSelectCurso={'background-color': '#ebebeb'};
	   this.styleSelectUser={'background-color': '#ebebeb'};
	   this.styleBlogResult={'color':'#ebebeb'};
	   this.mycarrera={};
	   this.mycurso={};
	   this.myuser={};
	   this.user="";
	    this.buscarCarrera= function(){	
             this.tempEstadoCurso=false;
             this.styleSelectCurso={'background-color':''};
                       
             
	    };
	    
	    this.CursoList= function(){	
            return this.mycarrera.cursos;
	    };
	    
	    this.buscarCurso= function(){
             this.tempEstadoUsuario=false;
             this.styleSelectUser={'background-color':''};
	    };
	    
	     this.userList= function(){	
            return this.mycurso.usuario;
	    };
	    
	    this.buscarUs= function(puser){	
             this.styleBlogResult={'color':''};
			for (var i=0; i < puser.length; i++) {
			  if (puser[i].usuario==this.myuser.usuario) {
			  	this.tempDuenio=i;
			  }
			};
	    }; 
	    
	    this.buscarUser= function(puser){	
	    	alert(this.user);
			for (var i=0; i < puser.length; i++) {
			  if (puser[i].usuario==this.user) {
			  	this.tempDuenio=i;
			  }
			};
	    }; 
	    
	    this.getDuenio = function(pIdDueno,puser){	
			return this.tempDuenio;
	    }; 
	    
	    
	    
	    
	       
	});
	
	
	
	
	
//Termina Sergio Herrera Durán----------------------------------------------




})();