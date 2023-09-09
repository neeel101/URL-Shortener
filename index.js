const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connect");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8001;
const app = express();
//mongo DB connection
try {
  connectToMongoDb(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDb connected ! "));
} catch (err) {
  (err) => console.log("Mongo Connection error", err);
}

//listen
app.listen(PORT, () => console.log("Express Server started on PORT", PORT));

//routers
const UrlRouter = require("./routes/url");
const staticRouter = require("./staticRoute/staticRoute");
const { userRouter } = require("./routes/user");

//route handling (middlewares)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routing (static and dynamic)
app.use("/url", UrlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

//server side rendering components
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
