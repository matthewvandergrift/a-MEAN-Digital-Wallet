var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CARDS_COLLECTION = "cards";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
const dbURI = 
"mongodb://Admin:M0ng0db1358@mongo-shard-00-00-qlmmr.mongodb.net:27017,mongo-shard-00-01-qlmmr.mongodb.net:27017,mongo-shard-00-02-qlmmr.mongodb.net:27017/test?ssl=true&replicaSet=Mongo-shard-0&authSource=admin&retryWrites=true";

mongodb.MongoClient.connect(process.env.MONGODB_URI || dbURI, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CARDS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/cards"
 *    GET: finds all cards
 *    POST: creates a new card
 */

app.get("/api/cards", function(req, res) {
  db.collection(CARDS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get cards.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/cards", function(req, res) {
  var newCard = req.body;
  newCard.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CARDS_COLLECTION).insertOne(newCard, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new card.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/cards/:id"
 *    GET: find card by id
 *    PUT: update card by id
 *    DELETE: deletes card by id
 */

app.get("/api/cards/:id", function(req, res) {
  db.collection(CARDS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get card");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/cards/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;
  db.collection(CARDS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set: {name: updateDoc.name, info: updateDoc.info}}, {upsert:true}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update card");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/cards/:id", function(req, res) {
  db.collection(CARDS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete card");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
