// Series of npm packages that we will use to give our server useful functionality
var express = require("express");
var app = express();
const helmet = require("helmet");
app.use(helmet());

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER - The below code effectively "starts" our server
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));