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
	if(window.location.pathname === '/Proyecto_1/documents.html'){
		$('.descargasOpt').addClass('active');
	}
	if(window.location.pathname === '/Proyecto_1/user-blog1.html'){
		$('#blogsUser1').addClass('active');
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
		
        $scope.showForum=true;
		$scope.showList=false;
		
		$('#course-title').text(forum.titulo);
		$('.inine-forum-list').addClass('ng-hide');
		$('.main-forum').val(forum.tema);
		$('.inine-forum-display').removeClass('ng-hide');
		$('.moderador').val(forum.moderador);
		$('#id-foro').attr('value', forum.id);
		var invi=[];
		for(var i= 0; i<(forum.invitados).length;i++){
			 invi.push(' '+(forum.invitados)[i].email);
		}
		$('.invitados').val(invi);	

		if((forum.comments).length >=1){
			$scope.comments= forum.comments;
			$('.comments-lst').show();
		}else{
			$('.comments-lst').hide();
		}

		setTimeout(function(){
			$(".stars").rating();
		}, 400);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 500);
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
		$('.forum-config .save').show();
		$('.forum-config .edit').hide();
		
	};
	// this.addToForum = function(){
	// 	var invitados = $('.invitados').val().split(', ');
	// 	$.find('#moderadorDisplay').text($('.moderador').val());
	// 	for (var i = invitados.length - 1; i >= 0; i--) {
	// 		$('#invitadosDisplay').append('<li> <span ng-click="forum.remove()" class="glyphicon glyphicon-remove delete"></span>'+invitados[i]+'</li>')
	// 	}
	// };

	this.remove = function(){
		console.log('remove');
	};

	this.denunciar = function(){
		alertify.confirm("Esta seguro que desea enviar la denuncia?", function (e) {
		    if (e) {
		        alertify.log("Su denuncia ha sido enviada");
		    } else {
		        
		    }
		});
		
	};
	this.createForum = function(){
		var invitados = $('.create-forumSection .invitados').val().split(', ');
		this.newforum={};
		
		for(var i= 0; i<invitados.length;i++){
			invitados[i] = 'email":"'+invitados[i];
		}
		// var rv = {};
	 //  for (var i = 0; i < invitados.length; ++i)
	 //    rv[i] = invitados[i];
	 //  console.log(rv);

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
		this.newforum.estado='A';


		forum.lists.push(this.newforum);
		newforum={};
		console.log(forum.lists); 
		alertify.success("Foro creado");
		$('#forum-create').collapse('toggle');

		$('.create-forumSection .invitados').val('');
		$('.forum-title').val('');
		$('.forum-periodo').val('');
		$('.create-forumSection textarea').val('');
		$('.create-forumSection .moderador').val('');
	};
	this.addComment = function(){
		var forumId= $('#id-foro').val();
		var forumS = [];
		var d = new Date();
		
		for(var i= 0; i<(forum.lists).length;i++){
			if((forum.lists)[i].id == forumId){
				forumS = (forum.lists)[i];
			}
		}	
		
		// // $scope.forumForm.$pristine = true;	
		this.comment.nombre = $('#usuario').text();
		this.comment.fecha = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
		forumS.comments.push(this.comment);

		this.comment={};
		$('#add-comment').collapse('toggle');
		$('.comment-text').val('');
		$('.comments-lst').show();

		setTimeout(function(){
			$(".stars").rating();
		}, 500);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 600);
	};

	this.editarForo = function(){
		var idF = $('#id-foro').val();
		var invitados = $('.inine-forum-display .invitados').val().split(', ');
		var cerrar = $("input:radio[name=estado]").val();
		var estado = 'A';

		if (cerrar === '1'){
			estado = 'I';
		}

		for (var i = invitados.length - 1; i >= 0; i--) {
			invitados[i] = 'nombre":'+ '"' + invitados[i];
		}

		for (var i = (forum.lists).length - 1; i >= 0; i--) {
			if((forum.lists)[i].id == idF){
				(forum.lists)[i].tema=$('.inine-forum-display .main-forum').val();
				(forum.lists)[i].moderador=$('.inine-forum-display #moderadorDisplay').text();
				(forum.lists)[i].invitados = invitados;
				(forum.lists)[i].estado= estado;
			}
		}
		console.log(forum.lists);

		$('.forum-config .save').hide();
		$('.forum-config .edit').show();
		$('#forum-usrs').collapse('toggle');
		if($scope.enable = true && $(".main-forum").attr('disabled')==='disabled'){
			$scope.enable = false;
			$('.main-forum').attr('disabled',false);	
		}
		else{
			$scope.enable = true;
			$('.main-forum').attr('disabled',true);	
		}
	};

}]);	

/************** ESTUDIANTE Forum Controllers **************/
app.controller('StudentForumController', ['$scope', '$http', function($scope, $http){
	var forum = this;
	forum.lists=[];
	this.comment = {};
	$scope.date = new Date();
	$http.get('/Proyecto_1/JSON/forums.json').success(function(data){
		for(var i= 0; i<data.length;i++){
			// if()
			forum.lists = data;
		}
	});

	this.displayForum = function(forum){
		$('.inine-forum-display').show();

		// $('.config-forumTitle').hide();
		// $('.course').text(forum.CursoId);
		$('.course-title').text(forum.titulo);
		$('.main-forum').text(forum.tema);
		$('#id-foro').attr('value', forum.id);
		var carrera;
		if((forum.CarreraId)==='1'){carrera="cursosDW.json";}
		if((forum.CarreraId)==='2'){carrera="cursosDS.json";}
		if((forum.CarreraId)==='3'){carrera="cursosInT.json";}
		if((forum.CarreraId)==='4'){carrera="cursosT.json";}
		if((forum.CarreraId)==='5'){carrera="cursosCS.json";}
		if((forum.CarreraId)==='6'){carrera="cursosBD.json";}
		if((forum.CarreraId)==='7'){carrera="cursosI.json";}

		$http.get('/Proyecto_1/JSON/'+carrera).success(function(data){
			for(var i= 0; i<data.length;i++){
				if(data[i].id === forum.CursoId){
					$('.course').text(data[i].name);
				}
			}
		});

		if((forum.comments).length >= 1){
			$scope.comments= forum.comments;
			$('.comments-lst').show();
		}else{
			$('.comments-lst').hide();
		}

		setTimeout(function(){
			$(".stars").rating();
		}, 400);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 500);
	};

	this.denunciar = function(){
		alert('Su denuncia ha sido enviada');
	};
	this.buscarForo = function(){
		$('.forum-search div .loading').show();
		setTimeout(function(){
			$('.forum-search div .loading').hide();
			$scope.showForumList=true;
			$('.Foro-lst').removeClass('ng-hide');
		}, 3000);
	};

	this.addComment = function(){
		var forumId= $('#id-foro').val();
		var forumS = [];
		var d = new Date();
		
		for(var i= 0; i<(forum.lists).length;i++){
			if((forum.lists)[i].id == forumId){
				forumS = (forum.lists)[i];
			}
		}	
		
		// $scope.forumForm.$pristine = true;	
		this.comment.nombre = $('#usuario').text();
		this.comment.fecha = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
		forumS.comments.push(this.comment);
		this.comment={};
		$('#add-comment').collapse('toggle');
		$('.comment-text').val('');
		$('.comments-lst').show();

		setTimeout(function(){
			$(".stars").rating();
		}, 500);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 600);
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
		this.style1={'background-color': '#196A95'};
		this.style2={'':''};
		this.style3={'':''};
		this.style4={'':''};
		this.style5={'':''};
		this.style6={'':''};
		this.style7={'':''};
		this.tab = 1;
		this.selectTab=function(setTab){			
			this.tab = setTab;
            
            switch (setTab){
            	
            	case 1:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style1={'background-color': '#196A95'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style2={'background-color': '#196A95'};
            	break;
            	case 3:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style3={'background-color': '#196A95'};
            	break;
            	case 4:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style4={'background-color': '#196A95'};
            	break;
            	case 5:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style5={'background-color': '#196A95'};
            	break;
            	case 6:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};            
            	this.style6={'background-color': '#196A95'};
            	break;
            	case 7:
         
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
				this.style4={'':''};
				this.style5={'':''};
				this.style6={'':''};
				this.style7={'':''};
            	this.style7={'background-color': '#196A95'};
            	break;
            } 
            
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
					
				console.log(setTab);
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
			alert("El usuario fue creado correctamente");
			 
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
			 alert("El usuario se midificó correctamente");


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
			 alert("El cambio se guardó correctamente");


			 }
			 		

});
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

//------------------------Profesores-----------------------------
	app.controller("ControlProfesores",function(){
	 this.msg={'display':'none'};
	 this.profe ="";
     this.carrera="";
     this.curso="";
     this.estadoCarrera=true;
     this.estadoCurso=true;
     this.styleCarrera={'background-color': '#ebebeb'};
     this.styleCurso={'background-color': '#ebebeb'};;                               
     
    this.activarCarrera=function(){  
      	this.estadoCarrera=false;
      	this.styleCarrera={'background-color':'', };
    }
			 
     this.activarCurso=function(){  
      	this.estadoCurso=false;
      	this.styleCurso={'background-color':'', };
    } 

    this.activarCurso=function(){  
      	this.estadoCurso=false;
      	this.styleCurso={'background-color':'', };
    } 

	this.guardarProfesor=function(pCarreras,pProfeCurso){
		 var arregloTemp={};
		 var estado=true;
		 arregloTemp.carrera=pCarreras[this.carrera].nombre;
	     arregloTemp.curso=pCarreras[this.carrera].cursos[this.curso].nombreCurso;
		 arregloTemp.profe=this.profe;
		 for (var i=0; i < pProfeCurso.length; i++) {
		    if ((pProfeCurso[i].carrera==arregloTemp.carrera)&&(pProfeCurso[i].curso==arregloTemp.curso)&&(pProfeCurso[i].profe==arregloTemp.profe)) {
 
		    	 this.msg={'color': '#ebebeb','display':'block','color':'#F58e25','text-align': 'center','font-size':'1em','margin-top':'2em' };
		    	 this.profe ="";
			     this.carrera="";
			     this.curso="";
			     this.estadoCarrera=true;
			     this.estadoCurso=true;
			     this.styleCarrera={'background-color': '#ebebeb'};
			     this.styleCurso={'background-color': '#ebebeb'};; 
		         estado=false;
		 
		     };

	  }; 
	  
	  if (estado==true) {
		 	
		 	      
				  pProfeCurso.push(arregloTemp);
				 
				 this.profe ="";
			     this.carrera="";
			     this.curso="";
			     this.estadoCarrera=true;
			     this.estadoCurso=true;
			     this.styleCarrera={'background-color': '#ebebeb'};
			     this.styleCurso={'background-color': '#ebebeb'};; 
			     this.msg={'display':'none'};
	};
		
	}    
	   	       
});


app.controller("desasignarCurso", function(){

	this.desProfesor=function(aProfeCurso,pCarrera,pCurso,pProfe){  

      	for (var i=0; i < aProfeCurso.length; i++) {
			
			if ((aProfeCurso[i].carrera==pCarrera) && (aProfeCurso[i].curso==pCurso) && (aProfeCurso[i].profe==pProfe)) {
				     aProfeCurso.splice( i , 1 );
			} 
			
		 };
      	 	
    } 

});
	


//---------------------------------------------------------------
//Termina Alejandro Zuñiga

//Controllers Keilyn Sibaja

app.controller('agregarDocController',['$http', function($http){
	var controller = this;
		controller.documentos= [];

		$http.get('/proyecto_1/JSON/docs.json').success(function(data){
			controller.documentos =data;
		});

		this.addDoc={};
		this.resultado=false;
		this.mostrarnombre='';
		this.mostrarautor='';
		this.mostrarfecha='';
		this.mostrarcarrera='';
		this.mostrarcurso='';

		this.datosDoc=function(){
			this.addDoc.votacion=0;
			controller.documentos.push(this.addDoc);
			this.addDoc={};
		}

		this.busqueda=function(){
			var h=arguments;
			for(var i=0; i<controller.documentos.length; i++){
				var doc=controller.documentos[i];

				if(doc.nombre.toUpperCase()===arguments[0].toUpperCase() && 
					doc.carrera.toUpperCase()===arguments[1].toUpperCase() && 
					doc.curso.toUpperCase()===arguments[2].toUpperCase()){
					this.resultado=true;
					this.mostrarnombre= doc.nombre;
					this.mostrarautor=doc.autor;
					this.mostrarfecha=doc.fecha;
					this.mostrarcarrera=doc.carrera;
					this.mostrarcurso=doc.curso;
					
					break;
				}
				else{
					this.resultado=null;
				}
			}
		}

}]);

app.controller('seccionDocumentosShow', function(){
	
	this.tab=2;

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
		var carrera = $('.carrera-select option:selected').attr('val');
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

//cambie el controlador a los mios para poder guardar cambios en el arreglo de post
//Sergio Herrera 
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
		        	   $('#mensajeLogin').html("");
		        	   $cookieStore.put('usuario', i);
		        	   $cookieStore.put('usuarioTipo', pUsuario[i].tipo);
 				     if (pUsuario[i].tipo=="A") {
 				     	window.location = "/Proyecto_1/configuration.html";
 				     } else{
 				     	window.location = "/Proyecto_1/user-blog1.html";
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
		        	   $('#mensajeRec').append(pUsuario[i].nombre + '<br>' + 'Se envió un correo a su cuenta:'+'<br>'+pUsuario[i].usuario+'<br>'+'con su nueva contraseña');
		        	   estado=true;	   
			   };
			   
			};
			if (!estado) {
				$('#mensajeRec').html("");
				$('#mensajeRec').append('Usuario Incorrecto');
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
        			$('#mensajePerfil').append("La confirmación de la nueva contraseña es incorrecta");
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
		this.value=false;
		this.guardar={'display':'none'};
		this.editar="";
		
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
            $("#newPost").val()       
            this.tabblogIn = getTab;
           for (var i=0; i < puser.blog.length; i++) {
			  if (puser.blog[i].idPost==pidBlog) {
	    		 this.blogtemp=i;
	    		 $("#newPost").val(puser.blog[i].texto)
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
		
			
			this.editarComent=function(){
					this.guardar={'':''};
					this.editar={'display':'none'};
					this.value=true;
			}
	
			this.saveComent=function(user,i,ipost){
				    this.editar={'':''};
					this.guardar={'display':'none'};
				    var tempText="";
				    tempText=$("#newPost").val();
				    user[i].blog[ipost].texto=tempText;
					this.value=false;
			}
		
		 	this.denunciar = function(){
				alert('su denuncia ha sido enviada');
			}
		    
		
		
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
	    	
	    	$('.loading').show();
		setTimeout(function(){
			$('.loading').hide();
			
		}, 500);
	    	
            
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