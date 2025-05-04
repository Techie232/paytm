const express = require('express');
const router = express.Router();
const z = require('zod');
const { User } = require('../db');
const { Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

router.post('/signup', async (req, res) => {
   const { username, firstName, lastName, password } = req.body;

   const bodySchmea = z.object({
      username: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string()
   })

   try {

      const response = bodySchmea.safeParse(req.body);

      if (!response.success) {
         return response.status(500).json({
            message: "Something went wrong",
            error: response.error
         })
      }

      const user = await User.findOne({
         username,
      })

      if (user) {
         return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
         })
      }

      const data = await User.create({
         username,
         firstName,
         lastName,
         password,
      })

      const account = await Account.create({
         userId: data._id,
         balance: 250,
      })

      res.status(200).json({
         message: "User created successfully",
      })

   } catch (error) {
      res.status(500).json({
         message: "Signup Error",
         error: error.message,
      })
   }

});

router.post('/signin', async (req, res) => {

   const { username, password } = req.body;

   try {
      const user = await User.findOne({
         username,
         password
      })

      if (!user) {
         return res.status(404).json({
            message: "User not found",
         })
      }

      const account = await Account.findOne({
         userId: user?._id
      })

      const token = jwt.sign({
         userId: user._id,
      }, JWT_SECRET)

      res.status(200).json({
         message: "Singed In successfully",
         token,
         user,
         account
      })

   } catch (error) {
      res.status(411).json({
         message: "Error while logging in"
      })
   }
});

router.put('/', authMiddleware, async (req, res) => {

   const { password, firstName, lastName } = req.body;

   const bodySchema = z.object({
      password: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional()
   })

   try {

      const scheErr = bodySchema.safeParse(req.body);

      if (!scheErr.success) {
         return res.status(400).json({
            msg: "Please send data correctly",
            error: scheErr.error
         })
      }

      await User.findOneAndUpdate({ _id: req.userId },
         {
            password,
            firstName,
            lastName
         },
      )

      res.status(200).json({
         message: "Updated successfully"
      })

   } catch (error) {
      res.json({
         error: error.message,
         message: "Error while updating information"
      })
   }

})

router.get('/acc', authMiddleware, async (req, res) => {

   try {
      const account = await Account.findOne({
         userId: req.userId
      })
      res.json({
         account
      })

   } catch (error) {
      res.json({
         error: error.message,
      })
   }
})

router.get('/bulk', async (req, res) => {

   const { filter } = req.query;

   try {

      const users = await User.find({
         $or: [
            {
               firstName: {
                  "$regex": filter,
                  $options: 'i',
               }
            },
            {
               lastName: {
                  "$regex": filter,
                  $options: 'i',
               }
            },
         ]
      }).select('username firstName lastName _id');

      if (users.length === 0) {
         return res.status(404).json({
            msg: "No User found with the given name",
         })
      }

      res.status(200).json({
         msg: "User/s Found",
         users,
      })

   } catch (error) {
      res.status(200).json({
         msg: "User finding failure",
         error: error.message,
      })
   }
})

module.exports = router;