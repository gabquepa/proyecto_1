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
	
	//Esta es una directiva que contiene recuperación de contraseña
	app.directive('recoverPass',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/recover-pass.html'
		};
		
	});
	
	//Esta es una directiva que contiene perfil de usuario
	app.directive('userProfile',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/profile.html'
		};
		
	});
	
	//Esta es una directiva que contiene el blog de usuario1
	app.directive('userBlog1',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/user-blog1.html'
		};
		
	});
	
	
//Termina Sergio Herrera Durán

//Comienza Alejandro
/*********************************Configuration Header***************************************************/
		app.directive('confHeader', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/confHeader.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Menu Crear/Modificar/Inhabilitar Usuario***************************************************/
		app.directive('usuarioMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/usuarioMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Crear Usuario***************************************************/
		app.directive('crearUsuario', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/crearUsuario.html'

		};
	});
/*****************************************************************************************************************/


/*Directivas Documentos KeilynSibaja*/

	app.directive('subirDocumento',function(){/*DIrectiva Subir Documento*/
		return{
			restrict:'E', 
			templateUrl:'/Proyecto_1/partials/subir-doc.html'
		};
	});

	app.directive('buscarDocumento',function(){/*DIrectiva buscar Documento*/
		return{
			restrict:'E', 
			templateUrl:'/Proyecto_1/partials/buscar-doc.html'
		};
	});

	app.directive('topDocumento',function(){/*DIrectiva top Documento*/
		return{
			restrict:'E', 
			templateUrl:'/Proyecto_1/partials/top-doc.html'
		};
	});

	app.directive('historialdescargasDocumento',function(){/*DIrectiva Historial Descargas Documento*/
		return{
			restrict:'E', 
			templateUrl:'/Proyecto_1/partials/historialdescargas-doc.html'
		};
	});

/*Directivas Documentos KeilynSibaja*/

})();