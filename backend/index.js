const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');  
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

//Node Mailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASS
    }

})




const emailSend = async (emailAddress, emailInfo) => {

    const mailOptions = {
        from: `"CourseHub" <${process.env.TRANSPORTER_USER}>`,
        to: emailAddress,
        subject: emailInfo.subject,
        html: emailInfo.message
    }

    const info = await transporter.sendMail(mailOptions);
    return info;

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
        // await client.connect();

        // console.log("Connected to MongoDB");
        const database = client.db('courseHub');
        const courses = database.collection('courses');
        const users = database.collection('users');
        const carts = database.collection('carts');
        const paymentHistories = database.collection('paymentHistories');
        const wishlists = database.collection('wishlists');
        const enrollments = database.collection('enrollments');
        const enrolledStudents = database.collection('enrolledStudents');

        //Generate Token
        app.post('/jwt', async (req, res) => {
            const email = req.body;
            const token = jwt.sign(email, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 3600 * 1000 // 1 hour in milliseconds
            })
            res.send({ message: true })
        })

        //Remove token when the user is Logged Out;
        app.post('/api/logout', async (req, res) => {
            res.clearCookie('token', {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
                path: '/', 
                maxAge: 0 
            });

            res.send({ success: true });

        })


        //Admin Middleware
        const verifyAdmin = async (req, res, next) => {
            try {
                const email = req.user?.email;
                const query = { email: email };
                const user = await users.findOne(query);
                const isAdmin = user?.role === 'admin';
                if (!isAdmin) {
                    return res.status(401).send({ message: 'Unauthorize Access' })
                }

                next();

            } catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        }


        //Student Middleware
        const verifyStudent = async (req, res, next) => {
            try {
                const email = req.user?.email;
                const query = { email: email };
                const user = await users.findOne(query);
                const isStudent = user?.role === 'student';

                if (!isStudent) {
                    return res.status(401).send({ message: 'Unauthorize Access' })
                }

                next();

            } catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        }

        //Verify Student Or Admin 
        const verifyStudentOrAdmin = async (req, res, next) => {
            try {
                const email = req.user?.email;
                const query = { email: email };
                const user = await users.findOne(query);
                const isExist = user?.role === 'admin' || user?.role === 'student';
                if (!isExist) {
                    return res.status(401).send({ message: 'Unauthorize Access' })
                };

                next();

            } catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        }

        //Save user in DB
        app.post('/user', async (req, res) => {
            try {
                const body = req.body;
                console.log(body)
                const query = { email: body?.email }
                const isExist = await users.findOne(query);
                if (isExist) {
                    return res.send({ message: 'user already exsit', insertedId: null })
                }

                const result = await users.insertOne(body);
                res.send(result);

            } catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })


        //Get the all users
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const result = await users.find().sort({ role: 1 }).toArray();
                res.send(result)

            } catch (error) {
                res.status(500).send({ message: 'Faild to fetch users' })
            }
        })


        //Get the user role
        app.get('/user/:email', async (req, res) => {
            try {
                const email = req.params?.email;
                const query = { email: email };
                const result = await users.findOne(query);
                res.send(result);

            } catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })


        //Delete Student/User
        app.delete('/student-remove/:email', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const email = req.params.email;
                const query = { email: email };
                const removeEnrolledStudents = await enrolledStudents.deleteOne(query);
                const removeEnrollments = await enrollments.deleteMany(query);
                const removeStudent = await users.deleteOne(query);
                res.send({ removeEnrolledStudents, removeEnrollments, removeStudent })

            } catch (error) {
                res.status(500).send({ message: 'Faild to remove student' });
            }
        })

    }
    finally{
        //await client.close();
    } 
}
run().catch(console.dir);

// Test Route
app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// Start the Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
