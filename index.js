const express = require("express");
const app = express();
require("./db");
const bodyParser = require("body-parser");
require("./route/user_routes");
require("./route/admin_routes");
require("./route/manager_routes");

PORT = 3009;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//user_router

const user = require("./route/user_routes");

app.use("/user", user);

//admin_router

const admin = require("./route/admin_routes");

app.use("/admin", admin);

//manager_router

const manager = require("./route/manager_routes");

app.use("/manager", manager);

app.listen(PORT, () => {
  console.log(`your server is runnig on port ${PORT}`);
});
