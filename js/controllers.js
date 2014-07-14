/* Controllers */

/************** Forum Controllers **************/

(function(){
var app = angular.module('controllers-project',[]);

app.controller('ForumController', function($scope){
	$scope.enable = true;
	
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
		$('#moderadorDisplay').append('<span id="delete" class="glyphicon glyphicon-remove"></span>');
		for (var i = invitados.length - 1; i >= 0; i--) {
			$('#invitadosDisplay').append('<li>'+invitados[i]+' <span ng-click="forum.remove()" class="glyphicon glyphicon-remove delete"></span></li>')
		}
	};
	this.remove = function(){
		console.log('remove');
	};
	
});	

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

app.controller('subirDocController',function(){//Contrilador de mi seccion Subir Documento
	
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

app.controller('topDocController', function(){
	
});

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
	
app.controller('validarLogin', function(){
		this.pass="";
		this.name="";
		
		this.testUser= function(pName,pPass, pUsuario){
			var estado=false;
			for (var i=0; i < pUsuario.length; i++) {
			  if (pPass==pUsuario[i].pass && pName==pUsuario[i].usuario) {
			  	estado=true;	
        		
        	   window.location = "/Proyecto_1/user-blog1.html";
			   };
			};
			if (!estado) {
				alert("ingreso Incorrecto");
				$("#usuario").val("");
				$("#pass").val("");
			};
			
		
	   };
	});
	

	
	


//Termina Sergio Herrera Durán----------------------------------------------






})();