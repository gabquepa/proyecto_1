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

})();