const express = require("express");
const UrlRouter = require("./routes/url");
const path = require("path");
const staticRouter = require("./staticRoute/staticRoute");
const { connectToMongoDb } = require("./connect");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8001  ;

//mongo DB connection
connectToMongoDb(process.env.MONGO_URI).then(() =>
  console.log("MongoDb connected ! ")
).catch(err => console.log(err))

//route handling (middlewares)
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routing (static and dynamic)
app.use("/url", UrlRouter); 
app.use("/", staticRouter); 

//server side rendering components
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//listen
app.listen(PORT, () => console.log("Express Server started on PORT", PORT));
