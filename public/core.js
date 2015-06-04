var dszTodo = angular.module('dszTodo', []);

function mainController($scope, $http){
	$scope.formData = {};

	//when landingo n the page, get all todos and display
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	//when submitting the add form, send the text to the node api
	$scope.createTodo = function(){
		$http.post('/api/todos',$scope.formData)
			.success(function(data){
				$scope.formData = {}; // clear the form so our user can enter another
				$scope.todos = data; // this api returns all todos
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};
}