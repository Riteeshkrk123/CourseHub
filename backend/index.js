const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//CORS Configuration
const options = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionalSuccessStatus: 200
}

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());




//verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        };

        req.user = decoded;
        next();


    })

}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coursehubcluster.ffb9l.mongodb.net/?retryWrites=true&w=majority&appName=CourseHubCluster`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//Connect to MongoDB
async function run() {
    try {
        await client.connect();

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}
run();

// Test Route
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// Start the Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});