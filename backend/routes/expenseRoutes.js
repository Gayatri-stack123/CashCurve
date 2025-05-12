const express = require("express");
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpensesExcel
} = require("../controllers/expenseController");
const {protect}=require("../middlewere/authMiddlewere");

const router =express.Router();

/**
 * @swagger
 * /api/v1/expense/add:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - date
 *               - category
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 */
router.post("/add",protect,addExpense);

/**
 * @swagger
 * /api/v1/expense/get:
 *   get:
 *     summary: Get all expenses for the authenticated user
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                   category:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Not authorized
 */
router.get("/get",protect,getAllExpense);

/**
 * @swagger
 * /api/v1/expense/downloadexcel:
 *   get:
 *     summary: Download expenses as Excel file
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Excel file download
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Not authorized
 */
router.get("/downloadexcel",protect,downloadExpensesExcel);

/**
 * @swagger
 * /api/v1/expense/delete/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Expense not found
 */
router.delete("/delete/:id",protect,deleteExpense);

module.exports = router;