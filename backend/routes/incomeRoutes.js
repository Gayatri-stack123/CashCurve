const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome
    /* downloadIncomeExcel */
} = require("../controllers/incomeController");

//console.log({ addIncome, getAllIncome, /*deleteIncome, downloadIncomeExcel*/ });

const {protect } = require("../middlewere/authMiddlewere");

const router = express.Router();

/**
 * @swagger
 * /api/v1/income/add:
 *   post:
 *     summary: Add a new income
 *     tags: [Income]
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
 *         description: Income added successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Not authorized
 */
router.post("/add",protect,addIncome);

/**
 * @swagger
 * /api/v1/income/get:
 *   get:
 *     summary: Get all incomes for the authenticated user
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of incomes
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
router.get("/get",protect,getAllIncome);

/**
 * @swagger
 * /api/v1/income/delete/{id}:
 *   delete:
 *     summary: Delete an income
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Income ID
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Income not found
 */
router.delete("/delete/:id",protect,deleteIncome);
/*router.get("/downloadexcel",protect,downloadIncomeExcel);*/

module.exports = router;

