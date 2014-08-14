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
	if(window.location.pathname === '/Proyecto_1/forum-profesor.html' || window.location.pathname === '/Proyecto_1/forum-estudiante.html'){
		$('.forumOpt').addClass('active');
	}
	if(window.location.pathname === '/Proyecto_1/documentos.html'){
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

	$http.post("/Proyecto_1/php/forum/listaForos.php", {"id_usuario" : "1"}).
	success(function(data, status) {
			forum.lists=data;
	}).
	error(function(data, status) {
		alertify.error("Ocurrio un error");
	});

	/*$http.get('/Proyecto_1/JSON/forums.json').success(function(data){
		for(var i= 0; i<data.length;i++){
			console.log('el profesor: ' +data[i].profesor);	
			// if()
			forum.lists = data;
		}
	});*/

	var idForo='';

	this.displayForum = function(forum){
		
        $scope.showForum=true;
		$scope.showList=false;

		idForo= forum.id_foro;

		$http.post("/Proyecto_1/php/forum/textoForos.php", {"id_foro": forum.id_foro}).
		success(function(data, status) {
			forum.tema=data['texto'];


			$('#course-title').text(forum.titulo);
			$('.inine-forum-list').addClass('ng-hide');
			$('.main-forum').val(forum.tema);
			$('.inine-forum-display').removeClass('ng-hide');
			$('.moderador').val(forum.moderador);
			$('#id-foro').attr('value', forum.id);
			var invi=[];

			//INVITADOS Y COMENTARIOS
			/*for(var i= 0; i<forum.invitados.length;i++){
				 invi.push(' '+(forum.invitados)[i].email);
			}
			$('.invitados').val(invi);	

			if((forum.comments).length >=1){
				$scope.comments= forum.comments;
				$('.comments-lst').show();
			}else{
				$('.comments-lst').hide();
			}*/

			setTimeout(function(){
				$(".stars").rating();
			}, 400);
			setTimeout(function(){
				$('.comment-stars .clear-rating').hide();
			}, 500);
		}).
		error(function(data, status) {
			alertify.error("Ocurrio un error");
		});
	};
	this.hideForum = function(){
		$scope.showForum=true;
		$scope.showList=false;
		$('.inine-forum-list').removeClass('ng-hide');
		$('.inine-forum-display').addClass('ng-hide');
		if($('#forum-usrs').hasClass('in')){
			$('#forum-usrs').collapse('toggle'); 
			$('.forum-config .save').hide();
			$('.forum-config .edit').show();
			$scope.enable = true;
			$('.main-forum').attr('disabled',true);	
		}
		if($('#add-comment').hasClass('in')){
			$('#add-comment').collapse('toggle'); 
		}
		$('.comentar-link').show();
		
	};

	this.enableTxt  = function(){
		if($scope.enable = true && $(".main-forum").attr('disabled')==='disabled'){
			$scope.enable = false;
			$('.main-forum').attr('disabled',false);
			$('.comentar-link').hide();
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
		    }
		});
	};
	this.createForum = function(){
		// console.log("test");
		 var titulo = $('#fTitulo').val();
         var periodo = $('#fPeriodo').val();
         var tema = $('#fTema').val();
         var invitar = $('#fInvitar').val();
         
        if (titulo.trim() == '' || periodo.trim() == '' || tema.trim() == '' || invitar.trim() == '' ) {
             	 // alert("Debe llenar todos los campos");
             	 alertify.log("Debe completar todos los campos");
             	// alertify.success("OJO");
             }
        else{
				var invitados = $('.create-forumSection .invitados').val().split(', ');
					this.newforum={};
		
				for(var i= 0; i<invitados.length;i++){
					invitados[i] = 'email":"'+invitados[i];
				}
		// var rv = {};
	 //  for (var i = 0; i < invitados.length; ++i)
	 //    rv[i] = invitados[i];
	 //  console.log(rv);

	 	var f=new Date(),
	 		fecha= f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate(),
			profesor="1",
			titulo= $('.forum-title').val(),
			periodo=$('.forum-periodo').val(),
			CursoId=$('.select-curso option:selected').attr('val'),
			tema=$('.create-forumSection textarea').val(),
			moderador=$('.create-forumSection .moderador').val(),//calcular el id;
			invitados = invitados,
			comments={},
			estado='1',
			moderadorid='';

		$http.post("/Proyecto_1/php/forum/moderador.php", { 
	 														"email" : moderador
		}).
		success(function(data, status) {
			moderadorid=data[0];
		}).
		error(function(data, status) {
			alertify.error("Error");
		});

	 	$http.post("/Proyecto_1/php/forum/crearForo.php", { 
	 														"id_usuario" : profesor,  
	 														"id_curso" : CursoId, 
	 														"id_moderador": moderadorid,
	 														"titulo" : titulo,  
	 														"estado" : estado,  
	 														"fecha": fecha ,
	 														"texto" : tema,  
	 														"periodo": periodo
		}).
		success(function(data, status) {
			alertify.success("El foro fue creado correctamente");
		}).
		error(function(data, status) {
			alertify.error("Ocurrio un error");
		});


		/*forum.lists.push(this.newforum);
		
		console.log(forum.lists); */

		$('#forum-create').collapse('toggle');

		$('.create-forumSection .invitados').val('');
		$('.forum-title').val('');
		$('.forum-periodo').val('');
		$('.create-forumSection textarea').val('');
		$('.create-forumSection .moderador').val('');
		}
	};

	
	this.addComment = function(){
		 var comment = $('#fComment').val();
		 if (comment.trim() == '') {
             	 // alert("Debe llenar todos los campos");
             	 alertify.log("Debe agregar un comentario");
             	// alertify.success("OJO");
             }else{


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
		alertify.success("El comentario fue enviado");

		setTimeout(function(){
			$(".stars").rating();
		}, 500);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 600);
	  }
	};

	this.editarForo = function(){
		var idF = idForo;
		var invitados = $('.inine-forum-display .invitados').val().split(', ');
		var cerrar = $("input:radio[name=estado]").val();
		var estado = 'A';
		alertify.confirm("Esta seguro que desea enviar los cambios?", function (e) {
		    if (e) {
		        if (cerrar === '1'){
					estado = 'I';
				}

				// INVITADOS
				/*for (var i = invitados.length - 1; i >= 0; i--) {
					invitados[i] = 'nombre":'+ '"' + invitados[i];
				}*/

				for (var i = (forum.lists).length - 1; i >= 0; i--) {
					if((forum.lists)[i].id_foro == idF){
						var tema=$('.inine-forum-display .main-forum').val();
						var moderador=$('.inine-forum-display #moderadorDisplay').text();
						var invitados = invitados;
						var estado= estado;

						$http.post("/Proyecto_1/php/forum/cambiosForo.php", {"texto":tema, "id_foro":idF}).
							success(function(data, status) {
								alertify.success("El foro fue editado correctamente");
							}).
							error(function(data, status) {
								alertify.error("Error");
							});

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
		    }// fin if
		    // else{
		    // 	alertify.error("Error");
		    // }
		});

		
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
		alertify.confirm("Esta seguro que desea enviar la denuncia?", function (e) {
		    if (e) {
		        alertify.log("Su denuncia ha sido enviada");
		    }
		});
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
		alertify.success("El comentario fue enviado");

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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.style3={'':''};	
		this.selectTab=function(setTab){		
				this.tab = setTab;	
				console.log(setTab);

				switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 3:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style3={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
				}

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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.selectTab=function(setTab){
			this.tab = setTab;

			switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            }
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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.style3={'':''};
		this.selectTab=function(setTab){
			this.tab = setTab;
			switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 3:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style3={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
				}
				if(setTab === 2){
					
				}
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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.style3={'':''};
		this.selectTab=function(setTab){
			this.tab = setTab;
			switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 3:
            	this.style1={'':''};
				this.style2={'':''};
				this.style3={'':''};
            	this.style3={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
				}
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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.selectTab=function(setTab){
			this.tab = setTab;
			switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            }
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
		this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
		this.style2={'':''};
		this.selectTab=function(setTab){
			this.tab = setTab;
			switch (setTab){

					case 1:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style1={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            	case 2:
            	this.style1={'':''};
				this.style2={'':''};
            	this.style2={'background-color': '#196A95', 'color':'#ffffff', 'padding':'8px'};
            	break;
            }
		};
		this.isSelected = function(checkedTab, pTab){
				if(pTab != 7){
					this.tab=0;

				}

			return this.tab ===checkedTab;
			
		};
	});


/*****************************************************************************************************************/	
app.controller("crearUserController", ['$scope', '$http', function($scope, $http){
		this.user = {};

		this.addUser = function(pUser){
			   
			  // console.log(this.user);
			 var nombUser = $('#nombUser').val();
             var correoUser = $('#correoUser').val();
             var passwUser = $('#passwUser').val();
             var apellidoUser = $('#apellidoUser').val();
             
 

             if (nombUser.trim() == '' || correoUser.trim() == '' || passwUser.trim() == '' || apellidoUser.trim() == '') {
             	 alertify.log("Debe completar todos los campos");
             }else{
				this.user.estado = "activo";
				pUser.push(this.user);
				/*aqui*/
				$http.post("/Proyecto_1/php/configuration/crea_usuario.php", { "tipo" : this.user.categoria ,  "email" : correoUser,  "nombre": nombUser,"apellido" : apellidoUser,  "estado" : '1',  "genero": this.user.genero,"calificacion" : '0',  "password": passwUser
				}).
				success(function(data, status) {
					alertify.success("El usuario fue creado correctamente");
				})
				.
				error(function(data, status) {
					alertify.error("Error");
				})
			 }
			
			
			this.user = {};	
		};//Fin funcion

	}]);
/*****************************************************************************************************************/	
app.controller("modificarUserController", ['$scope', '$http', function($scope, $http){
		var temp = 0;	 
		this.modifUser = function(pUser, pCorreo){
			if(pCorreo.toLowerCase().indexOf("@ucenfotec.ac.cr") >= 0){
				 $http.post("/Proyecto_1/php/configuration/muestra_usuario.php", { "email" : pCorreo
					}).
					success(function(data, status) {
						for(var i= 0; i<data.length;i++){
							if(data[i] === false){
								alertify.log("No se encontró ningún usuario");
								limpiar();
							}else{
								$('#id-usuario-mod').val(data[i].id_usuario);
								$('#nombreEncontrado').val(data[i].nombre);
								$('#apellidoEncontrado').val(data[i].apellido);
						 		$('#correoEncontrado').val(data[i].email);
						 		$('#passwordEncontrado').val(data[i].password);
						 		if(data[i].genero ==='m'){
						 			$('#generoHombre').attr('checked', 'checked');
						 		}
						 		else{
						 			$('#generoMujer').attr('checked', 'checked');
						 		}
						 		//If de categoria
						 		if(data[i].tipo ==='e'){
						 			$('#estudiante').attr('checked', 'checked');
						 		}
						 		else if(data[i].tipo ==='p'){
						 			$('#profesor').attr('checked', 'checked');
						 		}else if(data[i].tipo ==='r'){
						 			$('#rector').attr('checked', 'checked');
						 		}else if(data[i].tipo ==='d'){
						 			$('#director').attr('checked', 'checked');
						 		}
							}
						}
					})
					.
					error(function(data, status) {
						alertify.error("Error");
						limpiar();
					});
			}else{
				alertify.log("Debe buscar un correo válido");
				limpiar();
			}
		};//Fin de funcion

		this.user = {};
		this.saveModif = function(pModif){
			 var nombreEncontrado = $('#nombreEncontrado').val();
			 var apellidoEncontrado = $('#apellidoEncontrado').val();
             var correoEncontrado = $('#correoEncontrado').val();
             var passwordEncontrado = $('#passwordEncontrado').val();
             var genero = $("input:radio[name=genero]:checked").val();
             var tipo = $("input:radio[name=tipoUsuario]:checked").val();
             var id = $('#id-usuario-mod').val();

             if(nombreEncontrado.trim() == '' || apellidoEncontrado.trim() == '' || correoEncontrado.trim() == '' || passwordEncontrado.trim() == '' ){
             	 alertify.log("Debe completar todos los campos");
			}else{
				console.log('aqui esta');
				$http.post("/Proyecto_1/php/configuration/muestra_usuario.php", { 
				"tipo" : tipo, "email" : correoEncontrado, "nombre" : nombreEncontrado, "apellido" : apellidoEncontrado, "genero" : genero, "id_usuario" : id, "password" : passwordEncontrado
				// "tipo" : "e", "email" : "julian@ucenfotec.ac.cr", "nombre" : "nombreEncontrado", "apellido" : "apellidoEncontrado", "genero" : "m", "password" : "123", "id_usuario" : "5"
				}).
				success(function(data, status) {
					console.log(data);
					console.log('B-I-E-N');
				})
				.
				error(function(data, status) {
					$('.result-usuario').hide();
					alertify.error("Error");
					limpiar();
				});
				// alertify.success("El usuario se modificó correctamente");	
			}
		}
	}]);

/*****************************************************************************************************************/	
app.controller("inhabilitarUserController",['$scope', '$http', function($scope, $http){
	var temp = 0;
	this.buscaUser = function(pUser, pCorreo){	
		if(pCorreo.toLowerCase().indexOf("@ucenfotec.ac.cr") >= 0){
			$http.post("/Proyecto_1/php/configuration/muestra_usuario.php", { "email" : pCorreo
				}).
				success(function(data, status) {
					for(var i= 0; i<data.length;i++){
						if(data[i] === false){
							$('.result-usuario').hide();
							alertify.log("No se encontró ningún usuario");
							limpiar();
						}
						else{
							$('.result-usuario').show();
							$('#nombreUser').html(data[i].nombre+' '+data[i].apellido);
							$('#id-usuario-in').val(data[i].id_usuario);
					 		if(data[i].estado ==1){
					 			$('#activo').attr('checked', 'checked');
					 		}
					 		else if(data[i].estado ==3 ){
					 			$('#inactivo').attr('checked', 'checked');
					 		}
						}
					}
				})
				.
				error(function(data, status) {
					$('.result-usuario').hide();
					alertify.error("Error");
					limpiar();
				});
		}else{
			$('.result-usuario').hide();
			alertify.log("Debe buscar un correo válido");
			limpiar();
		}
	}
	 this.user = {};

	this.inaUser = function(){
		var estado,
			id=$('#id-usuario-in').val();
	 	if($("input:radio[name=estado]:checked").val() === "activo"){
	 		estado = 1;
	 	}else if ($("input:radio[name=estado]:checked").val() === "inactivo"){
	 		estado = 3;
	 	}

	 	console.log('estado: '+estado + ' id: '+id);

	 	$http.post("/Proyecto_1/php/configuration/estado_usuario.php", { "estado" : estado, "id_usuarrio" : id
		}).
		success(function(data, status) {
			alertify.success("Cambio guardado");
		})
		.
		error(function(data, status) {
			alertify.error("Error");
		});
	}
}]);

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
	
	//  console.log('Testing');
	
	// this.respDefault = function(){
	// 	console.log("Hola");
	// 	if(respuestaForo){
	// 	$('#permitirRespuesta').attr('checked', 'checked');
	// 	}else{
	// 		$('#denegarRespuesta').attr('checked', 'checked');
	// 	}
	// }

	this.cambiarRespuesta = function(){
		// console.log("entro");
		 var permitir = $('#permitirResp').val();
		 var denegar = $('#denegarResp').val();

		if ($('#permitirResp').is(':checked')) {
        	respuestaForo = true;
		    
		}else {
		    respuestaForo = false;
		 }

		 alertify.success("El cambio se guardo correctamente");
	}
		
		
		

	





});

//-----------------------Estudiantes----------------------------
app.controller("controlEstudiantes",function(){
	 this.estudiantes ="";
	 this.temp=[];
	 this.buscados="";
	 this.encontrados={};
	 this.asignados={};
	 this.agregados="";
     this.carrera="";
     this.carreraBus="";
     this.curso="";
     this.cursoDes="Resultados de Búsqueda";
     this.estudiantesTemp={};
     this.estadoUser=true;
     this.estadoCurso=true;
     this.styleUser={'background-color': '#ebebeb'};
     this.styleCurso={'background-color': '#ebebeb'}; 
     this.estadoCursoDes=true;
     this.styleCursoDes={'background-color': '#ebebeb'};
     var cont=2;                              

     
    this.getArreglo=function(){  
      return this.estudiantesTemp;
    };

    this.activarEst=function(){  
      	this.estadoUser=false;
      	this.styleUser={'background-color':'', };
    };
    
     this.activarCurso=function(){  
      	this.estadoCurso=false;
      	this.styleCurso={'background-color':'', };
      	this.estadoUser=true;
      	this.styleUser={'background-color': '#ebebeb'};
    };
    this.activarCursoDes=function(){  
      	this.estadoCursoDes=false;
      	this.styleCursoDes={'background-color':'', };
      
    };
    this.agregarEstudiantes=function(pcursoest){
           this.asignados = this.agregados.split(', ') && $('#asig').val().split(',');
           for (var i=0; i < this.asignados.length; i++) {
	            this.estudiantesTemp.curso=this.curso;
		        this.estudiantesTemp.estudiante=this.asignados[i];//this.agregados;
		        pcursoest.push(this.estudiantesTemp);
		        this.estudiantesTemp={};
           };
           $('#asig').val("");  
	 }; 

	 this.eliminarEstudiantes=function(pestu,pcurso,pcursoest){
	     for (var i=0; i < pcursoest.length; i++) {
	       if (pcursoest[i].estudiante==pestu && pcursoest[i].curso==pcurso){
	        	pcursoest.splice( i , 1 );
	        }
	     };   
	 }; 
	 
	 this.guardarEstudiantes=function(pcurest,pcuresttemp){      
	       for (var i=0; i < pcuresttemp.length; i++) {
				 this.estudiantesTemp.curso=pcuresttemp[i].curso;
				 this.estudiantesTemp.estudiante=pcuresttemp[i].estudiante;
				 pcurest.push(this.estudiantesTemp);
				 this.estudiantesTemp={};
		   };
	       pcuresttemp.length=0;
	 }; 
	 
	 this.encontrarEstudiantes=function(pcurest,pcurestBustemp){
	 	this.encontrados= this.buscados.split(', ') && $('#desasig').val().split(',');
		var estado=true;
		var estadoarre=false;
		
		for (var i=0; i < this.encontrados.length; i++) {
				estado=true; 
				for (var e=0; e < pcurest.length; e++) {
			          if (this.encontrados[i]==pcurest[e].estudiante) {
			          	this.estudiantesTemp.curso=pcurest[e].curso;
				        this.estudiantesTemp.estudiante=this.encontrados[i];
				        pcurestBustemp.push(this.estudiantesTemp);
				        this.estudiantesTemp={};
				        estado=false;
			          } 
		         }; 
		         if (estado) {
		         	this.temp.push(this.encontrados[i]);
		         	estadoarre=true;
		         }; 
		         
		};	
		
		if (estadoarre) {
			alertify.log("Los siguientes estudiantes no pertenecen a ningún curso:"+"<br>"+this.temp.join('<br>'));
			this.temp.length=0;
		};
	    $('#desasig').val(""); 
	 }; 
	 
	 this.desasignarredoEstudiantes=function(pestu,pcurso,pcurest){
		for (var i=0; i < pcurest.length; i++) {
	       if (pcurest[i].estudiante==pestu && pcurest[i].curso==pcurso){
	        	pcurest.splice( i , 1 );
	        }
	     };   
	 }; 
	 
	 this.desasignarEstudiantes=function(pcurest,ptemp){
		for (var i=0; i < pcurest.length; i++) {
	      for (var e=0; e < ptemp.length; e++) {
	       
	       if (pcurest[i].estudiante==ptemp[e].estudiante && pcurest[i].curso==ptemp[e].curso){
	        	pcurest.splice( i , 1 );
	        }
	     
	     }; 
	    
	    };
	    ptemp.length=0;    
	 }; 
    
     this.desasignarEstudiantesAv=function(pestu,pcurso,pcursoest){
	     for (var i=0; i < pcursoest.length; i++) {
	       if (pcursoest[i].estudiante==pestu && pcursoest[i].curso==pcurso){
	        	pcursoest.splice( i , 1 );
	        }
	     };   
	 }; 
	 
	 this.desasignarEstudiantesComp=function(pcursoest,pcurso){
	     var cont=[];
	     for (var i=0; i < pcursoest.length; i++) {
	       if (pcursoest[i].curso==pcurso){
	        	cont.push(pcurso);
	        }
	     };
	      
	     for (var e=0; e < cont.length; e++) {
	        for (var i=0; i < pcursoest.length; i++) {
		       if (pcursoest[i].curso==cont[e]){
		        	pcursoest.splice(i, 1 );
		        }
	     	};
		      
		 };

	 }; 
	 
	 this.descartarBus=function(){
	 	this.cursoDes="Resultados de Búsqueda";
	 }
      
});





//------------------------Fin Estudiantes________________________



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
		         /** alertify.success("El profesor se asigno correctamente");**/
		 
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
			     /**alertify.log("El profesor ya está asignado a un curso");**/

	};

		console.log("aa");
		alertify.success("El profesor se asigno correctamente");
	} //Fin guardarProfesor  

	   	       
});


app.controller("desasignarCurso", function(){

	this.desProfesor=function(aProfeCurso,pCarrera,pCurso,pProfe){  

		alertify.confirm("Desea desasignar este curso?", function (e) {
		    if (e) {

		    	for (var i=0; i < aProfeCurso.length; i++) {
					
					if ((aProfeCurso[i].carrera==pCarrera) && (aProfeCurso[i].curso==pCurso) && (aProfeCurso[i].profe==pProfe)) {
						     aProfeCurso.splice( i , 1 );
					} 
					
				 };// Fin For
		        
		    } else {
		        // user clicked "cancel"
		    }
		});




		   //    	for (var i=0; i < aProfeCurso.length; i++) {
					
					// if ((aProfeCurso[i].carrera==pCarrera) && (aProfeCurso[i].curso==pCurso) && (aProfeCurso[i].profe==pProfe)) {
					// 	     aProfeCurso.splice( i , 1 );
					// } 
					
				 // };// FIn For

      	 	
    } //Fin desProfesor

});
	


//---------------------------------------------------------------
//Termina Alejandro Zuñiga




//********************>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Controllers Keilyn Sibaja

app.controller('agregarDocController',['$http', function($http){
	var controller = this;
		controller.documentos= [];

		$http.get('/proyecto_1/JSON/docs.json').success(function(data){
			controller.documentos =data;
		});

		var f = new Date();

		this.addDoc={};
		this.resultado=false;
		this.mostrarnombre='';
		this.mostrarautor='';
		this.mostrarfecha='';
		this.mostrarcarrera='';
		this.mostrarcurso='';
		this.mostrarvotacion=0;

		this.validacionbuscar=function(){
			var busCarrera=$('#busquedaCarrera').val(),
				busCurso=$('#busquedaCurso').val();

			if(arguments[0]==undefined || busCarrera=="" || busCurso==""){

				document.getElementById('doc_inpbuscardoc').value ='';
				document.getElementById('busquedaCarrera').value='Seleccione una Carrera';
				document.getElementById('busquedaCurso').value='Seleccione un Curso';

				alertify.log("Debe completar todos los campos");
				
			}
			else{
				for(var i=0; i<controller.documentos.length; i++){
					var doc=controller.documentos[i];

					if(doc.nombre.toUpperCase()===arguments[0].toUpperCase() && 
						doc.carrera.toUpperCase()===busCarrera.toUpperCase() && 
						doc.curso.toUpperCase()===busCurso.toUpperCase()){

						this.resultado=true;
						this.mostrarvotacion=doc.votacion;
						this.mostrarnombre= doc.nombre;
						this.mostrarautor=doc.autor;
						this.mostrarfecha=doc.fecha;
						this.mostrarcarrera=doc.carrera;
						this.mostrarcurso=doc.curso;

						document.getElementById('doc_inpbuscardoc').value ='';
						document.getElementById('busquedaCarrera').value='Seleccione una Carrera';
						document.getElementById('busquedaCurso').value='Seleccione un Curso';
						
						break;
					}
					else{
						this.resultado=null;

						document.getElementById('doc_inpbuscardoc').value ='';
						document.getElementById('busquedaCarrera').value='Seleccione una Carrera';
						document.getElementById('busquedaCurso').value='Seleccione un Curso';
					}
				}
			}
		}


		this.validacionsubir=function(){
			var input =  $("#exampleInputFile")[0].files[0],
				subCarrera = document.getElementById('addcarrera').value,
				subCurso = document.getElementById('addcurso').value;

			if(input==undefined ||arguments[0]==undefined || arguments[1]==undefined || 
				subCarrera=="" || subCurso==""){

				document.getElementById('exampleInputFile').value ='';
				subCarrera.value='Seleccione una Carrera';
				subCurso.value='Seleccione un Curso';
				alertify.log("Debe completar todos los campos");
			}
			else{

				this.addDoc.carrera=subCarrera;
				this.addDoc.curso=subCurso;
				this.addDoc.votacion=0;
				this.addDoc.fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
				controller.documentos.push(this.addDoc);
				this.addDoc={};

				document.getElementById('exampleInputFile').value ='';
				subCarrera.value='Seleccione una Carrera';
				subCurso.value='Seleccione un Curso';

				alertify.success("El documento se subio correctamente");
			}
		}

		setTimeout(function(){
			$(".stars").rating();
		}, 100);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 100);


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

		//console.log('Test');

		$http.get('/proyecto_1/JSON/docs.json').success(function(data){
			docDesc.descargas =data;
			//console.log(data);
		});

		setTimeout(function(){
			$(".stars").rating();
		}, 400);
		setTimeout(function(){
			$('.comment-stars .clear-rating').hide();
		}, 500);

}]);
//Controllers Keilyn Sibaja



//Sergio Herrera Durán----------------------------------------------

//controlador recive json de usuarios
app.controller('UserController',['$http',function($http){
		var store = this;
		store.user=[];
		store.carreras=[];
		store.listaPost = [];
		store.listaComentarioPost = [];
		

		$http.post("/Proyecto_1/php/blog/info_post.php", {"id_usuario" : "8"}).
				 success(function(data, status) {
				   for (var i=0; i<data.length; i++) {
				   	store.listaPost.push(data[i]);
				   	

				   }
				 }).
				 error(function(data, status) {
				  alertify.error("Ocurrio un error");
				 });

		$http.post("/Proyecto_1/php/blog/info_comentarioPost.php", {"id_post" : "17"}).
				 success(function(data, status) {
				   for (var i=0; i<data.length; i++) {
				   	store.listaComentarioPost.push(data[i]);
				   	 console.log(store.listaComentarioPost[1]);

				   }
				 }).
				 error(function(data, status) {
				  alertify.error("Ocurrio un error");
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
            var temp=true;
	        $("#usuario").css("border","solid #ccc 1px");
	        $("#pass").css("border","solid #ccc 1px");
	        validarCampo($('#usuario'));
	        validarCampo($('#pass'));

			if (temp){
					for (var i=0; i < pUsuario.length; i++) {
					  if (pPass==pUsuario[i].pass && pName==pUsuario[i].usuario) {
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
						alertify.error("Usuario o Contraseña Inválida");
						$("#usuario").val("");
						$("#pass").val("");
					};
			}else{
				 alertify.log("Debe completar todos los campos");
			};
			
			
			function validarCampo (pcampo) {
		        	   var campo=pcampo.val();
					   if (campo.trim()=="") {
					   	temp=false;
					   	pcampo.css("border","solid #fa787e 1px");
					   };
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
			 var temp=true;
	        $("#usuarioRec").css("border","solid #ccc 1px");
	        validarCampo($('#usuarioRec'));

			if (temp){
					for (var i=0; i < pUsuario.length; i++) {
					  if (pName==pUsuario[i].usuario) {
				        	   alertify.success("Se envió un correo a su cuenta: "+pUsuario[i].usuario);
				        	   estado=true;	   
					   };
					   
					};
					if (!estado) {
						alertify.error("Usuario Incorrecto");
						$("#usuarioRec").val("");
					};
			
		   }else{
		   	alertify.log("Debe completar todos los campos");
		   };
		    function validarCampo (pcampo) {
		        	   var campo=pcampo.val();
					   if (campo.trim()=="") {
					   	temp=false;
					   	pcampo.css("border","solid #fa787e 1px");
					   };
		    };
	   };
	});
	
//controlador muestra y oculta contenedores del login
	app.controller('controlLogin', function(){
		this.tablog = 1;
		
		this.getTab=function(getTab){
			$("#usuarioRec").css("border","solid #ccc 1px");
			 $("#usuario").css("border","solid #ccc 1px");
	        $("#pass").css("border","solid #ccc 1px");
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
			if (getTab==1) {
				limpiarForms ();
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
        var temp=true;
        var tempPass="";
        $(".passnew").css("border","solid #ccc 1px");
        validarCampo($('#passuser'));
        validarCampo($('#newpass'));
        validarCampo($('#confirmnew'));

        if(temp){
        	
        	if (this.pass.pactual==pPassAct.pass) {
        		if (this.pass.pnew==this.pass.pnewconf) {
        			$('#mensajePerfil').html("");
        			tempPass=this.pass.pnewconf;
        			this.pass={};
        			limpiarForms ();
        			alertify.success("Su contraseña se cambió con éxito");
        			pPassAct.pass=tempPass;
        			
        		} else{
        			$('#mensajePerfil').html("");
        			alertify.error("La confirmación de la nueva contraseña es incorrecta");
        			
        		};
        		
        		
	        	} else{
	        		$('#mensajePerfil').html("");
	        		alertify.error("Contraseña inválida");
	                       	
	        	};
        	
        	}else{
	     	 alertify.log("Debe completar todos los campos");
	        };
        	
        	function validarCampo (pcampo) {
        	    var campo=pcampo.val();
			   if (campo.trim()=="") {
			   	temp=false;
			   	pcampo.css("border","solid #fa787e 1px");
			   };
		    };
		};
		
		function limpiarForms () {
		   $('#passuser').val("");
			$('#newpass').val("");
			$("#confirmnew").val("");
		}
		
		
		
		
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
           for (var i=0; i < puser.length; i++) {
			  if (puser[i].id_post==pidBlog) {
	    		 this.blogtemp=i;
	    		 $("#newPost").val(puser[i].texto)
	    	  };
			};
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
		
			
			this.editarPost=function(){
					this.guardar={'':''};
					this.editar={'display':'none'};
					this.value=true;
			};
	
			this.savePost=function(user,i,ipost){
				    var temp=true;
				    var tempText=$("#newPost").val();
				    $("#newPost").css("border","solid #ccc 1px");
				   
				    validarCampo($("#newPost"));
				    if (temp){
					    user[i].blog[ipost].texto=tempText;
						this.value=false;
						this.editar={'':''};
					    this.guardar={'display':'none'};
					};
					
					function validarCampo (pcampo) {
		        	   var campo=pcampo.val();
					   if (campo.trim()=="") {
					   	temp=false;
					   	pcampo.css("border","solid #fa787e 1px");
					   	alertify.log("El campo del post no puede estar vacío");
					   };
				    };
					
					
			};
		
		    this.regresar=function(getTab){  
		            if (this.value) {
		            	alertify.log("Debe guardar los cambios" + "<br>" + "realizados en el post");
		            } else{
		            	this.tabblogIn = getTab;
		            };
		    };
		
		 	this.denunciar = function(){
				alertify.confirm("Esta seguro que desea enviar la denuncia?", function (e) {
				    if (e) {
				        alertify.log("Su denuncia ha sido enviada");
				    }
				});
			}
		    
		    this.deletePost = function(postid,puser,tab){

	
		    	for (var i=0; i < puser.blog.length; i++) {
				  if (puser.blog[i].idPost==postid) {
				  	    $("#newPost").css("border","solid #ccc 1px");  
		            	alertify.success("El post fue eliminado");
		            	this.tabblogIn = tab;
	                    puser.blog.splice(i , 1 );

		    	  };
		    	  
				};
				this.editar={'':''};
				this.guardar={'display':'none'};
	            this.value=false;
				$("#divEditarPost").hide();
	        };
		
		
	});
	
	 app.controller("AddBlogController",['$scope', '$http', function($scope, $http){
	// app.controller("AddBlogController", function(){
		var cont=2;
		var temp=true;
		var d = new Date();
		var strDate = d.getFullYear()+ "/" + (d.getMonth()+1)+ "/" +d.getDate();
		this.newblog={};
		this.coment={};
		this.newblog.fecha=strDate;
		//$("#dateBlog1").val(strDate);
	    this.addPost = function(puser, plistaPost){	
	     var temp=true;
	     $(".addBlogBtn").css("border","solid #ccc 1px");
	     validarCampo($('#tituloBlog1'));
	     validarCampo($('#textBlog1'));
	     	 
	     if(temp){

	     	this.newblog.idPost=cont;
			this.newblog.comentarios=[];
			puser.blog.push(this.newblog);
			
			cont++;
			this.newblog.fecha=strDate;
			console.log(this.newblog.titulo);
			console.log(this.newblog.texto);
			console.log(this.newblog.fecha);
			
// $http.post("/Proyecto_1/php/configuration/crea_usuario.php", { "tipo" : this.user.categoria ,  "email" : correoUser,  "nombre": nombUser,"apellido" : apellidoUser,  "estado" : '1',  "genero": this.user.genero,"calificacion" : '0',  "password": passwUser
// 				}).
			$http.post("/Proyecto_1/php/blog/crea_post.php", { "id_usuario" : 8 , "titulo" : this.newblog.titulo ,  "texto" : 8888,  "fecha": this.newblog.fecha }).
				success(function(data, status) {
					alertify.success("El Post fue creado correctamente");

					plistaPost.length = 0;

					$http.post("/Proyecto_1/php/blog/info_post.php", {"id_usuario" : "8"}).
							 success(function(data, status) {

							   for (var i=0; i<data.length; i++) {
							   	plistaPost.push(data[i]);
							   }
							 }).
							 error(function(data, status) {
							  alertify.error("Ocurrio un error");
							 });


				})
				.
				error(function(data, status) {
					alertify.error("Error");
				})




	        this.newblog={};
			alertify.success("El post fue creado");
			$('#addBlog').collapse('toggle');
	     }else{
	     	 alertify.log("Debe completar todos los campos");
	     };
	     
	     function validarCampo (pcampo) {
		    var campo= pcampo.val();
			if (campo.trim()=="") {
		   	temp=false;
		   	pcampo.css("border","solid #fa787e 1px");
		   };
		 }
			
	   
	    };
	    
	 }]);

	
	// });

	app.controller("addComent",function(){
	    var cont=2;
	    var d = new Date();
		var strDate =d.getDate()+ "/" + (d.getMonth()+1)+ "/" + d.getFullYear();
		
		this.newCom={};
        this.newCom.fecha=strDate;
       
	    this.addComt = function(pIdPost,pPart,pDueño){
	    	 var temp=true;
	    	 $("#comentblog").css("border","solid #ccc 1px");
             validarCampo($('#comentblog'));	
		     
		     if(temp){
		     	    this.newCom.idComentario=cont;
					this.newCom.Participante=pPart;
		            pDueño.blog[pIdPost].comentarios.push(this.newCom);
		            
					this.newCom={};
					cont++;
					this.newCom.fecha=strDate;
					alertify.success("El comentario fue enviado");
					$('#contcomentblog').collapse('toggle');
		     }else{
		     	alertify.log("Debe completar el campo");
		     };	
						  
		    
		    function validarCampo (pcampo) {
			   var campo= pcampo.val();
			   if (campo.trim()=="") {
			   	temp=false;
			   	pcampo.css("border","solid #fa787e 1px");
			   };
			 };
		    
	    }; 
	    
	       
	});
	
	
	app.controller("buscarUser",function(){
	   this.tempDuenio="";
	   this.nombre="";
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
             $('#opt1').attr("disabled","disabled");
              $('#userslt').val("");
             $("#searchBlog").val("");
             $('.loading').hide();
             this.tempEstadoCurso=false;
             this.styleSelectCurso={'background-color':''};
             this.tempEstadoUsuario=true;
             this.styleSelectUser={'background-color': '#ebebeb'};               
	    };
	    
	
         this.searchUser= function(puser){	
         	this.styleBlogResult={'color':'#ebebeb'};
         	this.tempDuenio="";
         	$('.loading').show();
			  for (var i=0; i < puser.length; i++) {
			  	
			  if (puser[i].usuario==this.user || puser[i].nombre==this.user ) {
			  	 this.tempDuenio=i;
			  	 $('.loading').hide();
			     this.styleBlogResult={'color':''};
			  }
			  
			  for (var a=0; a < puser[i].blog.length; a++) {
				      if (puser[i].blog[a].titulo==this.user){
				      	 this.tempDuenio=i;
				      	 $('.loading').hide();
				      	  this.styleBlogResult={'color':''};
				      };
			  };
			}
			if (this.user=="") {
				$('.loading').hide();
			};
	    }; 

	    
	    this.CursoList= function(){	
             
            return this.mycarrera.cursos;
	    
	    };
	    
	    this.buscarCurso= function(){
             $("#searchBlog").val("");
             $('.loading').hide();
             this.tempEstadoUsuario=false;
             this.styleSelectUser={'background-color':''};
	    };
	    
	     this.userList= function(){	
            return this.mycurso.usuario;
	    };
	    
	    
	    
	    this.buscarUs= function(puser){
	         var temp=true;
	        
		     $(".slctSearchblog").css("border","solid #ccc 1px");
		     validarCampo($('#cursoslt'));
		     validarCampo($('#cursosslt'));
		     validarCampo($('#userslt'));
	    	 $("#searchBlog").val("");
	    	 $('.loading').hide();
	    	 
	    	 if (temp){
				for (var i=0; i < puser.length; i++) {
				  if (puser[i].usuario==this.myuser.usuario) {
	                 $('.loading').show();
					setTimeout(function(){
						$('.loading').hide();
		                $('#srchBlog').collapse('toggle'); 
					}, 500);
				   this.tempDuenio=i;
				   this.styleBlogResult={'color':''};
				  };
				
				};
			}else{
				alertify.log("Debe completar todos los campos");
			};
				
			
			function validarCampo (pcampo) {
				var campo= pcampo.val();
			   if (campo==null || campo.trim()=="" ) {
		
			   	temp=false;
			   	pcampo.css("border","solid #fa787e 1px");
		      };
		   };
            
	    };
	    
	   
	    this.resetSearch = function () {
		    $("#searchBlog").val("");
	    	$('.loading').hide();
		}
	    
	    this.buscarUser= function(puser){	
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

	app.controller("socialShare",function(){
		var vUrl =  window.location.href,
			vTitle="test";

		this.shareTwitter = function(){
			window.open(
				'http://twitter.com/share?url='+vUrl + '&text=' . vTitle,
				'twitterShareDialog',
				'width=575,height=400');

		};
		this.shareFacebook = function(){
			window.open(
		      'https://www.facebook.com/sharer/sharer.php?u='+vUrl, 
		      'facebookShareDialog', 
		      'width=626,height=436'); 

		};
		this.shareG = function(){
			window.open(
				'https://plus.google.com/share?url='+vUrl,
				'googlePlusShareDialog',
				'width=575,height=400');

		};

	});


})();

function limpiar(){
	$('input').val('');
}
