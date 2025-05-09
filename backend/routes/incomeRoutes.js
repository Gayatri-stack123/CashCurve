const express = require("express");
const {
    addIncome,
    getAllIncome
    /* deleteIncome,
    downloadIncomeExcel */
} = require("../controllers/incomeController");

console.log({ addIncome, getAllIncome, /*deleteIncome, downloadIncomeExcel*/ });

const {protect } = require("../middlewere/authMiddlewere");

const router = express.Router();

router.post("/add",protect,addIncome);
router.get("/get",protect,getAllIncome);
/*router.get("/downloadexcel",protect,downloadIncomeExcel);
router.delete("/:id",protect,deleteIncome);*/

module.exports = router;

