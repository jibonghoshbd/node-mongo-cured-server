const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json())

/* user name  : mydbuser15 
password : CH6pqW0t92BVgVag
*/


const uri = "mongodb+srv://mydbuser15:CH6pqW0t92BVgVag@cluster0.whptl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const collectionUsers = database.collection("users");
        // get api 
        app.get('/users', async (req, res) => {
            const cursor = collectionUsers.find({});
            const users = await cursor.toArray();
            res.send(users);
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await collectionUsers.findOne(query);
            // console.log('load user with id: ', id);
            res.send(user);
        })

        // post api 
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await collectionUsers.insertOne(newUser);
            // console.log("got new user", req.body);
            // console.log('added user', result);
            res.json(result)
        });
        // Delete api 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collectionUsers.deleteOne(query)
            console.log("Deleting users", result);
            res.json(result)
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send(" Now Node MongoDB Cured Server")
})

app.listen(port, () => {
    // console.log("Inside the mongodb");
})