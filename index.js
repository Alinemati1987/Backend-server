const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const authRouter = require("./routers/auth");
const authMiddleWare = require("./auth/middleware");
const bodyParserMiddleWare = express.json();

const usersRouter = require("./routers/usersRouter");
const spacesRouter = require("./routers/spacesRouter");
const storiesRouter = require("./routers/storiesRouter");

const app = express();

app.use(corsMiddleWare());

app.use(loggerMiddleWare("dev"));

app.use(bodyParserMiddleWare);

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

// GET endpoint for testing purposes, can be removed
app.get("/", (req, res) => {
  res.send("Hi from express");
});

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});

app.use("/", authRouter);

app.use("/users", usersRouter);
app.use("/spaces", spacesRouter);
app.use("/stories", storiesRouter);
app.use(authRouter);

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
