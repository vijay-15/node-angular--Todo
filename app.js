var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var path       = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

var todo = [];

var id = 0;

app.get('/getData', function(req,res) {

	res.status(200);
	res.json(todo);

});

app.post('/new', function(req,res) {
	var newToDo = {
		id    : id++,
		data  : req.body.todo || req.query.todo,
		time  : new Date(),
		state : "NOT DONE"
	};

	todo.push(newToDo);

	res.status(200);
	res.json(todo);

});

app.put('/update', function(req,res) {

	var id = req.body.id || req.query.id;

	for(i=0; i<todo.length; i++) {
		if( todo[i].id == id ) {

			if(todo[i].status == "DONE") {
				todo[i].status = "NOT DONE";
			}
			else {
				todo[i].status = "DONE";
			}
			
		}
	}

	res.status(200);
	res.json(todo);
})

app.listen(3000, function(err,data) {
	if(err) throw err;
	console.log("SERVER LISTENING ON 3000");
})


