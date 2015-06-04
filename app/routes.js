//routes =====================================
var Todo = require('./models/todo');

//api -----------------------------
module.exports = function(app){
	//get all todos
	app.get('/api/todos', function(req,res){
		Todo.find(function(err, todos){

			//if an error occurs, return that. No more processing will execute
			if (err) 
				res.send(err);

			res.json(todos); // return all todos in json
		});
	});

	//create todo and send back all todos after creation
	app.post('/api/todos', function(req,res){

		//create a todo, information comes  from AJAX request from angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo){
			if (err) 
				res.send(err);

			//after creation, return all todos
			Todo.find(function(err, todos){
				if (err) 
					res.send(err);

				res.json(todos);
			});
		});
	});

	//delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		},function(err, todo){
			if(err)
				res.send(err);

			//return all todos after the list is refreshed.
			Todo.find(function(err, todos){
				if (err)
					res.send(err);

				res.json(todos);
			});
		});
	});

	//application ---------------------------------
	app.get('*',function(req,res){
		res.sendfile('./public/index.html'); // load the single view file.
	});
};