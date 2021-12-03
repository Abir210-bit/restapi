let mongoose = require('mongoose');
const express = require('express')
const { ObjectID } = require('mongodb')
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
const server = process.env.server || '127.0.0.1:27017';
const database = process.env.database || 'Users';
const mongoClient = require('mongodb').MongoClient

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoClient.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            err ? console.log("can't connect to db") : console.log("db connected");
            const datab = client.db(database)

            app.get('/getallusers', (req, res) => {
                datab.collection('user')
                    .find()
                    .toArray((err, data) => {
                        err ? console.log(err) : res.send(data)
                    })


            });
            app.post('/adduser', (req, res) => {
                let newuser = req.body
                datab.collection('user')
                    .insertOne(newuser, (err, data) => {
                        err ? console.log('can\'t add') : res.send(data)
                    })

            })

            app.delete('/deleteuser/:id', function(req, res) {
                let id_r = req.params.id
                datab.collection('user')
                    .deleteOne({ _id: ObjectID(id_r) }, (err, data) => {
                        err ? console.log('can\'t remove') : res.send(data)
                    })
            });

            app.put('/updateuser/:id', function(req, res) {
                const id_user = req.params.id

                datab.collection('user')
                    .findOneAndUpdate({ _id: ObjectID(id_user) }, { $set: req.body }, (err, data) => {
                        err ? console.log(err) : res.send(data)
                    })


            })


        });


    }
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = new Database()