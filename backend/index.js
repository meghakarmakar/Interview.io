const express = require('express');
const http = require('http');
const cors = require('cors');
const questionsRoute = require('./routes/questions.route');
const authRoute = require('./routes/auth.route');
const quizRoute = require('./routes/quiz.route');
const connectToMongo = require("./connectDb")
const { initializeSocket } = require('./socket');


const app = express();
const server = http.createServer(app);

connectToMongo()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: [
        "http://localhost:5173",
      ],
      credentials: true, 
    })
);

app.use('/api/v1/questions', questionsRoute);
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/quiz', quizRoute)
app.use("/uploads", express.static("uploads"));

initializeSocket(server);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

