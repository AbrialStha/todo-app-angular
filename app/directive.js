app.directive('myTask', function() {
    return {
        restrict: 'AEC',
	    scope: {
	      detail: '=info'
	    },
	    templateUrl: 'app/partials/my-task.html'
    };
});