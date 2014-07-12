/* Controllers */

/************** Forum Controllers **************/

(function(){
var app = angular.module('controllers-project',[]);

app.controller('ForumController', function($scope){
	$scope.enable = true;
	
	this.enableTxt  = function(){
		if($scope.enable = true && $(".main-forum").attr('disabled')==='disabled'){
			$scope.enable = false;
			$(".main-forum").attr('disabled',false);	
		}
		else{
			$scope.enable = true;
			$(".main-forum").attr('disabled',true);	
		}
		
	};

	this.addToForum = function(){
		
		
	};
	
});	

})();