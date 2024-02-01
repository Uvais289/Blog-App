// auth.routes.js
const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = Router();

authRouter.get("/me", (req, res) => {
  res.send({ message: "It's me!" });
});

authRouter.post("/signup", authController.signupHandler);

authRouter.post("/login", authController.loginHandler);

module.exports = authRouter;
