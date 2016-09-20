//Factory or Services(I like Factory :D)
	app.factory('TodoFactory',function(){
		var todofac = [];

		var todolist = [
			// {
			// 	_id:0,
			// 	task:'npm init',
			// 	status:'completed'
			// },
			// {
			// 	_id:1,
			// 	task:'Install angular through npm, npm i angular -S',
			// 	status:'completed'
			// },
			// {
			// 	_id:2,
			// 	task:'Install bootstrap through npm, npm i bootstrap -S',
			// 	status:'completed'
			// },
			// {
			// 	_id:3,
			// 	task:'create a index.html and link all necessary files',
			// 	status:'completed'
			// }
		];

		todofac.getList = function(){
			return todolist;
		}

		todofac.addItem = function(item){
			todolist.push(item);
			console.log(todolist);
		}

		todofac.updateItem = function(id,index,value){
			console.log(id,index,value);
			if(index == 'status'){

				todolist.forEach(function(item){
					console.log(item.id);
					if(item._id == id)
						item.status = value;
				});
			}
			console.log(todolist);
		}

		todofac.deleteItem = function(id) {
			var i = 0;//counter
			todolist.forEach(function(obj) {
				console.log(obj._id,id);
				if(obj._id == id){
					console.log('sucess',i);
					todolist.splice(i,1)
				}
				i++;
			});

			console.log(todolist);
		}

		return todofac;
	});