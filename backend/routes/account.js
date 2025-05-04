const express = require('express');
const { Account, User } = require('../db');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
   const userId = req.userId;

   try {
      const user = await Account.findOne({ userId });

      res.status(200).json({
         balance: user.balance
      })

   } catch (error) {
      return res.status(500).json({
         error: error.message,
         message: "Failure while fetching the balance",
      })
   }

})

router.post("/transfer", authMiddleware, async (req, res) => {

   const session = await mongoose.startSession();
   session.startTransaction();

   try {

      const { amount, to } = req.body;

      if (amount <= 0) {
         return res.status(400).json({
            msg: "Amount should be in postive number"
         })
      }

      // Fetch the accounts within the transaction
      const account = await Account.findOne({ userId: req.userId }).session(session);

      if (!account || account.balance < amount) {
         await session.abortTransaction();
         return res.status(400).json({
            message: "Insufficient balance"
         });
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
         await session.abortTransaction();
         return res.status(400).json({
            message: "Invalid account"
         });
      }

      // Perform the transfer
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
      await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

      // Commit the transaction
      await session.commitTransaction();
      res.json({
         message: "Transfer successfull"
      });
   } catch (error) {
      await session.abortTransaction();
      res.json({
         error: error.message,
      });
   } finally {
      session.endSession();
   }
});

module.exports = router;