const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
var db;

const url = 'mongodb://employees_crud_user:V1RMgvXjqAa4EMry@ds133450.mlab.com:33450/employees_crud';
app.use(express.static(path.join(__dirname, '/static')));

//Returns middleware that only parses json
app.use(bodyParser.json({
  type: function(){
    return true;
  }
}));

MongoClient.connect(url, (err, dbConnection) => {
	assert.equal(err, null);
	db = dbConnection;
	var server = app.listen(3000, () => {
		var port = server.address().port;
		console.log("Started server at port", port);
	});
});



app.get('/api/employees', (req, res) => {
	db.collection('employees').find().toArray((err, docs) => {
		assert.equal(err, null);
		res.json(docs);
	})
});

app.post('/add', (req, res) => {
  console.log("Adding new employee.");
  var newEmployee = req.body;
	db.collection('employees').insertOne(newEmployee, (err, result) => {
		var newId = result.insertedId;
		//The cursor method next() access the doucment.
		db.collection('employees').find({_id : newId}).next((err, doc) => {
			res.json(doc);
		});
	});
});

app.get('/api/employees/:id', (req, res) => {
	db.collection('employees').findOne({_id: ObjectId(req.params.id)}, (err, employee) =>{
		res.json(employee);
	});
});

app.put('/:id', (req, res) => {
	var updatedEmployee = req.body;
	console.log("Updating employee, id:", req.params.id);
	var oid = ObjectId(req.params.id);
	db.collection('employees').replaceOne({_id: oid}, updatedEmployee, (err, result) => {
		assert.equal(err, null);
		db.collection('employees').find({_id: oid}).next((err, doc) => {
			res.send(doc);
		});
	});
});

app.delete('/:id', (req, res) => {
  console.log("Deleting employee, id:", req.params.id);
  var oid = ObjectId(req.params.id);
  db.collection('employees').findOneAndDelete({_id: oid}, (err, doc) => {
    assert.equal(err, null);
    res.send(doc)
  })
})
