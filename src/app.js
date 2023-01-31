const createError = require("http-errors");
const express = require("express");
const compression = require("compression");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const { isAuthenticated } = require("./middlewares/auth.middleware");

// create express web server app
const app = express();

// log requests to the terminal when running in a local debug setup
if (process.env.NODE_ENV !== "production") app.use(logger("dev"));

// app.use(express.json());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false, parameterLimit: 200000 }));
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

// Define URL for our compute server
// - For local debugging on the same computer, compute.geometry.exe is
//   typically running at http://localhost:8081/
// - For a production environment it is good to use an environment variable
//   named RHINO_COMPUTE_URL to define where the compute server is located
// - And just in case, you can pass an address as a command line arg

const argIndex = process.argv.indexOf("--computeUrl");
if (argIndex > -1) process.env.RHINO_COMPUTE_URL = process.argv[argIndex + 1];
if (!process.env.RHINO_COMPUTE_URL)
  process.env.RHINO_COMPUTE_URL = "http://localhost:8081/"; // default if nothing else exists

// console.log('RHINO_COMPUTE_URL: ' + process.env.RHINO_COMPUTE_URL)

// app.set('view engine', 'hbs');
// app.set('views', './src/views')

// Routes for this app
app.use("/", express.static(path.join(__dirname, "../frontend/dist/")));
// app.use("/examples", express.static(__dirname + "/examples/"));
app.use("/examples", require("./routes/example"));
app.get('/favicon.ico', (req, res) => res.status(200))
app.use("/definition", require("./routes/definition"));
app.use("/solve", require("./routes/solve"));
// app.use('/view', require('./routes/template'))

// Register API routes here
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/products", require("./routes/product"));
app.use("/api/order", require("./routes/order"));

// ref: https://github.com/expressjs/express/issues/3589
// remove line when express@^4.17
express.static.mime.types["wasm"] = "application/wasm";

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // console.error(err);
  res.locals.error = req.app.get("env") === "development" ? err : {};
  data = { message: err.message };
  if (req.app.get("env") === "development") {
    data.stack = err.stack;
  }
  // send the error
  res.status(err.status || 500).send({message: `Cannot ${req.method} ${req.url}`});
});

try {
  const uri = process.env.MONGODB_CONN_STR || "mongodb://localhost:27017";
  mongoose.set("strictQuery", false);
  const dbName = "henning";
  mongoose.connect(
    uri,
    {
      dbName,
    },
    async (err) => {
      if (err) {
        console.log({ error: err.message });
      } else {
        console.log("Established connection to database");
      }
    }
  );
} catch (error) {
  console.log(error);
}

module.exports = app;
