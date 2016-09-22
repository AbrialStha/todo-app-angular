app.directive('myTask', function() {

	var linker = function(scope, element, attrs){
		scope.showInput = false;

	    scope.toggleShowInput = function($timeout)
	    {
	        scope.showInput = !scope.showInput;
	    };

	    // if I execute scope.$apply(); here, it will work, but it will give me
        // the infamous $apply already in progress error
        $timeout(function(){
          scope.input.focus();
        },0);
	};

    return {
        restrict: 'AEC',
	    scope: {
	      info: '='
	    },
	    replace: true,
	    templateUrl: 'app/partials/my-task.html'
    };
})
.directive('todoFocus', function todoFocus($timeout) {
  'use strict';
  return function (scope, elem, attrs) {
    scope.$watch(attrs.todoFocus, function (newVal) {
      if (newVal) {
        $timeout(function(){
          elem[0].focus();
        },0,false);
      };
    });
  }
})
.directive('todoEscape', function () {
    'use strict';

    var ESCAPE_KEY = 27;

    return function (scope, elem, attrs) {
      elem.bind('keydown', function (event) {
        if (event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.todoEscape);
        }
      });

      scope.$on('$destroy', function () {
        elem.unbind('keydown');
      });
    };
  });