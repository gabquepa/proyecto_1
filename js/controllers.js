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

})();