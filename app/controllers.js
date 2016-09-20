//Controllers
	app.
	controller('TodoController',['$scope', 'TodoFactory', function($scope, TodoFactory){
		$scope.list = TodoFactory.getList();

		//for the unique id extra work ahhh
		var id = function() {
			return '_' + Math.random().toString(36).substr(2,9);
		}
		console.log(id());

		$scope.item = {
			_id: id(),
			todo:"",
			status:'incomplete'
		}

		$scope.checkStatus = function(status){
			if(status == 'completed')
				return true;
			else
				return false;
		}

		$scope.changeStatus = function(id,status){
			if(status =='completed')
				TodoFactory.updateItem(id,'status','incomplete');
			else
				TodoFactory.updateItem(id,'status','completed');
		}

		$scope.deleteItem = function(id){
			TodoFactory.deleteItem(id);
		}
	}]).
	controller('TodoFormController',['$scope','TodoFactory', function($scope,TodoFactory){
		$scope.addTodo = function(){
			TodoFactory.addItem($scope.item);
			$scope.todoForm.$setPristine();
			$scope.item = {
				_id: $scope.list.length,
				todo:"",
				status:'incomplete'
			}
		}
	}]);