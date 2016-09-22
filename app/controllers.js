//Controllers
	app.
	controller('TodoController',['$scope', 'TodoFactory', '$localStorage', function($scope, TodoFactory, $localStorage){
		$scope.list = TodoFactory.getList();
		//Add to local Storage(initializing the default value)
			$scope.$storage = $localStorage.$default({
				list: TodoFactory.getList()
			});


		$scope.item = {
			_id: '',
			task:"",
			status:'incomplete'
		}

		//to check the status of the task
		$scope.checkStatus = function(status){
			if(status == 'completed')
				return true;
			else
				return false;
		}

		//to change the status(basically toggling the status)
		$scope.changeStatus = function(id,status){
			if(status =='completed'){
				TodoFactory.updateItem(id,'status','incomplete');
				//delete $localStorage.list;
				$scope.$storage.list = TodoFactory.getList();
			}
			else{
				TodoFactory.updateItem(id,'status','completed');
				$scope.$storage.list = TodoFactory.getList();
			}
		}

		//to delete a task
		$scope.deleteItem = function(id){
			TodoFactory.deleteItem(id);
			$scope.$storage.list = TodoFactory.getList();
		}

		//to update the task
		$scope.updateTask = function(id){
			console.log(id);
			TodoFactory.updateItem( id, 'task', $scope.item.task );
			$scope.$storage.list = TodoFactory.getList();
			$scope.toggleShowInput();
		}

		//for the auto text input appear(magic)
		$scope.showInput = false;
	    $scope.toggleShowInput = function($timeout)
	    {
	        $scope.showInput = !$scope.showInput;
	    }
	    $scope.revertEdits = function(id){
	    	console.log(id);
	    	var oldItem = TodoFactory.getItem(id);
	    	console.log(oldItem);
	    	$scope.toggleShowInput();
	    }
	}]).
	controller('TodoFormController',['$scope','TodoFactory', '$localStorage', function($scope,TodoFactory,$localStorage){
		//for the unique id extra work ahhh
		var id = function() {
			return '_' + Math.random().toString(36).substr(2,9) + "-" + createUUID();
		}
		// console.log(id());

		//for the UUID
		var createUUID = function() {
		    var s = [];
		    var hexDigits = "0123456789abcdef";
		    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
		    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		    s[8] = s[13] = s[18] = s[23] = "-";

		    var uuid = s.join("");
		    return uuid;
		}
		// console.log(createUUID());

		//form control action(this is for the TodoForm)
		$scope.addTodo = function(){
			$scope.item._id = id();
			TodoFactory.addItem($scope.item);
			$scope.$storage.list = TodoFactory.getList();
			$scope.todoForm.$setPristine();
			$scope.item = {
				_id: $scope.list.length,
				task:"",
				status:'incomplete'
			}
		}
	}]);