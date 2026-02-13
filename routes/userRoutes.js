const express = require("express");
const {
  addUser,
  createWallets,
  transaction,
  getWalletsDetails,
  getUserTransaction,
} = require("../controller/userController");

const router = express.Router();

// User API's
router.post("/add-user", addUser);

// Transaction API's
router.post("/create-wallets", createWallets);
router.post("/wallets/:userId/:action", transaction);
router.get("/get-wallets-details/:userId", getWalletsDetails);
router.get("/get-user-transaction/:userId", getUserTransaction);

module.exports = router;
