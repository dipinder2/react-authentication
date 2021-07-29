const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

require('dotenv').config();

require("./server/config/mongoose.config");


app.use(express.json(), express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


const AllMyUserRoutes = require("./server/routes/user.routes");
AllMyUserRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
