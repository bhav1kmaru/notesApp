const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        _id:
 *          type: String
 *          description: auto-generated id
 *
 *
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *    responses:
 *       '200':
 *         description: OK
 *
 */

    
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ msg: "something went wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send({ message: "Registered" });
      }
    });
  } catch (error) {
    res.send({ message: "Unable to Register", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "shhhhh");
          res.send({ msg: "Logged In", token: token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "wrong credentials" });
    }
  } catch (error) {
    res.send({ msg: "unable to login", error: error.message });
  }
});

module.exports = { userRouter };
