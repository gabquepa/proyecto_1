(function(){
	var app = angular.module('myApp',['partials-project', 'controllers-project']);



	app.controller('configController', function($scope) {

		  $scope.mostrarTabUsuario = false;

		  $scope.mostrarCrearUsuario = false;
		  $scope.mostrarModificarUsuario = false;
		  $scope.mostrarInhabilitarUsuario = false;
	});

	


})();

$(".stars").rating();