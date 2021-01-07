// importing
// const express = require('express');
import express from 'express';
// const keys = require('./keys');  
// import { MONGOURI } from './keys';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import Pusher from 'pusher';
// const Message = require('./dbMessages');
import Message from './dbMessages.js';
import cors from 'cors';


// app config
const app = express();
const port = process.env.PORT || 5000;

const pusher = new Pusher({
  appId: "1098090",
  key: "04a426db3a3f28d48574",
  secret: "a7c2b2daab60c4f38bf7",
  cluster: "eu",
  useTLS: true
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

// middlewares
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Header", "*");
//     next();
// })


const MONGOURI = "mongodb+srv://jibbol:bLUrH0F9RhIlb7hp@cluster0.fifqb.mongodb.net/whatsapp-clone?retryWrites=true&w=majority"
// connection to DB
mongoose.connect(MONGOURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Yeah! DB Connected");

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
        // console.log(change);
        if (change.operationType === 'insert') {
            const msgDetails = change.fullDocument;
            pusher.trigger('message', 'inserted',
            {
                name: msgDetails.name,
                message: msgDetails.message,
                timeStamp: msgDetails.timeStamp,
                received: msgDetails.received
            }
            );
            console.log(msgDetails);
        } else {
            console.log("Error trigerring pusher");
        }
    })
})

// mongoose.connection.on("connected", () => {
//     console.log("yeah! connected to mongodb");
// });

// mongoose.connection.on("error", () => {
//     console.log("error connecting to mongoDB", err);
// })


// logic ???

// Api routes
app.get('/', (req, res) => res.status(200).send("hello world!"))
app.post('/api/v1/messages/new', (req, res) => {
    const dbMessage = req.body;

    Message.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/api/v1/messages/sync', (req, res) => {
    Message.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listener
app.listen(port, () => {
    console.log(`Server currently running on port ${port}`);
})