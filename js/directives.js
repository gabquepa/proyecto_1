'use strict';

/* Directives */
(function(){
var app = angular.module('partials-project',[]);

app.directive('projectHeader', function(){
	return{
		restrict: 'E',
		templateUrl: '/Proyecto_1/partials/header.html'
	};
});
app.directive('projectFooter', function(){
	return{
		restrict: 'E',
		templateUrl: '/Proyecto_1/partials/footer.html'
	};
});
app.directive('projectSideNav', function(){
	return{
		restrict: 'E',
		templateUrl: '/Proyecto_1/partials/side-nav.html'
	};
});

//Sergio Herrera Durán
	//Esta es una directiva que contiene el login
	app.directive('contLogin',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/login.html'
		};
		
	});
//Termina Sergio Herrera Durán


})();