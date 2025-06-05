import express from "express";
import {
  getTransactions,
  createTransaction,
  approveTransaction
} from "../controllers/TransactionController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/transactions", verifyUser, getTransactions);

router.post("/transactions", verifyUser, createTransaction);

router.patch("/transactions/:id/approve", verifyUser, adminOnly, approveTransaction);

export default router;
