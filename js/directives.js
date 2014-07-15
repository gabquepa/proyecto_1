'use strict';

/* Directives */
(function(){
var app = angular.module('partials-project',[]);

app.directive('projectHeader', function(){

	return{
		restrict: 'E',
		templateUrl: '/Proyecto_1/partials/header.html',
		controller: function($scope, $cookieStore){
			$scope.cookieValue = $cookieStore.get('usuario');
			// alert($scope.cookieValue);
		}
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
	
	//Esta es una directiva que contiene el blog de usuario3
	app.directive('userBlog3',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/user-blog3.html'
		};
		
	});
	
	//Esta es una directiva que contiene el blog de usuario3
	app.directive('userBlog4',function(){
		return{
			
			restrict:'E', //esto es un elemento
			templateUrl:'/Proyecto_1/partials/user-blog4.html'
		};
		
	});
	
//Termina Sergio Herrera Durán

//Comienza Alejandro 

///////DIRECTIVAS DE CONFIGURACION///////////////////
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
/*********************************Directiva Modificar Usuario***************************************************/
		app.directive('modificarUsuario', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/modificarUsuario.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Inhabilitar Usuario***************************************************/
		app.directive('inhabilitarUsuario', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/inhabilitarUsuario.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Inhabilitar Usuario***************************************************/
		app.directive('foroMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/foroMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Respuesta de Foros***************************************************/
		app.directive('respuestaForos', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/respuestaForos.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Sistema de Votacion***************************************************/
		app.directive('sistemaVotacion', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/sistemaVotacion.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Procesar Denuncias***************************************************/
		app.directive('procesarDenuncias', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/procesarDenuncias.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Menu Crear/Modificar/Inhabilitar CARRERA***************************************************/
		app.directive('carreraMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/carreraMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Crear CARRERA***************************************************/
		app.directive('crearCarrera', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/crearCarrera.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Modificar CARRERA***************************************************/
		app.directive('modificarCarrera', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/modificarCarrera.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Modificar CARRERA***************************************************/
		app.directive('inhabilitarCarrera', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/inhabilitarCarrera.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Menu Crear/Modificar/Inhabilitar CURSO***************************************************/
		app.directive('cursoMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/cursoMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Crear CURSO***************************************************/
		app.directive('crearCurso', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/crearCurso.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva modificar CURSO***************************************************/
		app.directive('modificarCurso', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/modificarCurso.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva inhabilitar CURSO***************************************************/
		app.directive('inhabilitarCurso', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/inhabilitarCurso.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Menu PROFESORES***************************************************/
		app.directive('profesoresMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/profesoresMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Asignar Profesor***************************************************/
		app.directive('asignarProfesor', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/asignarProfesor.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Desasignar Profesor***************************************************/
		app.directive('desasignarProfesor', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/desasignarProfesor.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Menu ESTUDIANTES***************************************************/
		app.directive('estudiantesMenu', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/estudiantesMenu.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Asignar Estudiante***************************************************/
		app.directive('asignarEstudiante', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/asignarEstudiante.html'

		};
	});
/*****************************************************************************************************************/
/*********************************Directiva Desasignar Estudiante***************************************************/
		app.directive('desasignarEstudiante', function(){
		return{
			restrict: 'E',
			// restrict: 'A',
			templateUrl: '/Proyecto_1/partials/desasignarEstudiante.html'

		};
	});

/////////////////////////////////////////Termina Alejandro Zuñiga ////////////////////////////////////////////////////

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