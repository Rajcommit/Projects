const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('redis');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redisClient = Redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});
redisClient.connect();

const mongoClient = new MongoClient(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:27017`);
mongoClient.connect().then(() => {
  console.log('Connected to MongoDB');
  const db = mongoClient.db('chatdb');
  const messages = db.collection('messages');

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', async (msg) => {
      await redisClient.publish('chat', msg);
      await messages.insertOne({ message: msg, timestamp: new Date() });
      io.emit('message', msg);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  redisClient.subscribe('chat', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(4000, () => {
  console.log('Backend running on port 4000');
});