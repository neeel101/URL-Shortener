const express = require("express");
const UrlRouter = require("./routes/url");
const { urlModel } = require("./model/url");
const path = require("path");
const staticRouter = require("./staticRoute/staticRoute");
const { connectToMongoDb } = require("./connect");

const PORT = 8001;

//mongo DB connection
connectToMongoDb("mongodb://127.0.0.1:27017/urlShortner").then(() =>
  console.log("MongoDb connected ! ")
);

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
