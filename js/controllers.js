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
			$('#invitadosDisplay').append('<li>'+invitados[i]+' <span id="delete" class="glyphicon glyphicon-remove"></span></li>')
		};
	};
	
});	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
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


})();