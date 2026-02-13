const TransactionModel = require("../models/Transaction");
const UserModel = require("../models/User");
const WalletModel = require("../models/Wallet");

const addUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(401).send({ msg: "Username is required!" });
    }

    const isExist = await UserModel.findOne({ username: username });
    if (isExist)
      return res.status(401).send({ msg: "Username already exist!" });

    const userData = new UserModel({
      username,
    });
    await userData.save();

    const userWallet = new WalletModel({
      user_id: userData?._id,
    });
    await userWallet.save();

    return res.status(200).send({ msg: "User added.", userData });
  } catch (error) {
    return res.status(500).send(error || error?.message);
  }
};

const createWallets = async (req, res) => {
  console.log("createWallets");
};

const transaction = async (req, res) => {
  try {
    const { userId, action } = req.params;
    const { amount, referenceId } = req.body;
    let finalAmount = amount;

    const transactionID = Math.floor(100000 + Math.random() * 900000);

    if (!userId || !action || !amount || !referenceId) {
      return res.status(401).send({
        msg: "User id || action || amount || reference id is required!",
      });
    }

    const isExist = await WalletModel.findOne({ user_id: userId });

    if (!isExist) {
      return res.status(401).send({ msg: "Wallet is not found!" });
    }

    if (action && action !== "credit" && action !== "debit") {
      return res.status(401).send({ msg: "Action must be credit or debit!" });
    }

    if (referenceId && (referenceId.length > 6 || referenceId.length < 6)) {
      return res
        .status(401)
        .send({ msg: "Reference ID must and could be 6 digit!" });
    }

    if (referenceId === isExist?.reference_id) {
      return res
        .status(401)
        .send({ msg: "Reference id can not be duplicate!" });
    }

    if (amount && amount <= 0) {
      return res.status(401).send({ msg: "Amount must be grater then 0!" });
    }

    let previousAmount = isExist?.amount;

    if (action && action === "credit") {
      previousAmount = previousAmount
        ? (previousAmount += finalAmount)
        : finalAmount;
    } else if (action && action === "debit") {
      if (isExist?.amount <= 0) {
        return res.status(401).send({ msg: "Insufficient balance!" });
      } else {
        previousAmount = previousAmount
          ? (previousAmount -= finalAmount)
          : finalAmount;
      }
    }

    const updateWallet = await WalletModel.updateOne(
      { user_id: userId },
      {
        amount: previousAmount,
      },
    );

    const transactionData = new TransactionModel({
      user_id: userId,
      action,
      amount: amount,
      reference_id: referenceId,
      transaction_id: transactionID,
      status: "success",
    });
    await transactionData.save();

    return res.status(200).send({ msg: "Transaction successful." });
  } catch (error) {
    return res.status(500).send(error || error?.message);
  }
};

const getWalletsDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const isExist = await WalletModel.findOne({ user_id: userId });

    if (!isExist) {
      return res.status(401).send({ msg: "Wallet is not found!" });
    }
    return res.status(200).send({ msg: "Success", isExist });
  } catch (error) {
    return res.status(500).send(error || error?.message);
  }
};

const getUserTransaction = async (req, res) => {
  const { userId } = req.params;

  try {
    const isExist = await TransactionModel.find({ user_id: userId }).sort({
      createdAt: -1
    }).limit(10);

    if (!isExist) {
      return res.status(401).send({ msg: "Transaction is not found!" });
    }
    return res.status(200).send({ msg: "All Transactions", isExist });
  } catch (error) {
    return res.status(500).send(error || error?.message);
  }
};

module.exports = {
  addUser,
  createWallets,
  transaction,
  getWalletsDetails,
  getUserTransaction,
};
