import Transaction from "../models/TransactionModel.js";
import User from "../models/UserModel.js";

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    let response;
    if (req.role === "manager") {
      response = await Transaction.findAll({
        include: [{ model: User, attributes: ["uuid", "name", "email"] }],
        order: [["date", "DESC"]],
      });
    } else {
      response = await Transaction.findAll({
        where: { userId: req.userId },
        include: [{ model: User, attributes: ["uuid", "name", "email"] }],
        order: [["date", "DESC"]],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  const { description, amount } = req.body;
  try {
    await Transaction.create({
      description,
      amount,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Transaction created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Approve transaction (manager only)
export const approveTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { uuid: req.params.id },
    });
    if (!transaction) return res.status(404).json({ msg: "Transaction not found" });

    await Transaction.update(
      { status: "approved" },
      { where: { id: transaction.id } }
    );

    res.status(200).json({ msg: "Transaction approved" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
