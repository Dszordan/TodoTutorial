// js/controllers/main.js

angular.module('todoController',[])
	.controller('mainController', function($scope,$http, Todos){
		$scope.formData = {};

		//when landingo n the page, get all todos and display
		Todos.get()
			.success(function(data){
				$scope.todos = data;
			});

		//when submitting the add form, send the text to the node api
		$scope.createTodo =  function(){
			//Validate
			if (!$.isEmptyObject($scope.formData)) {
				Todos.create($scope.formData)
					.success(function(data){
						$scope.formData = {};
						$scope.todos = data;
					});
			};
		};

		$scope.deleteTodo = function(id){
			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
				});
		};
	});