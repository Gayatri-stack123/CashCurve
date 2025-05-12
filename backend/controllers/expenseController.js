//  const ExpenseSchema = require("../models/ExpenseModel")


// exports.addExpense = async (req, res) => {
//     const {title, amount, category, description, date}  = req.body

//     const income = ExpenseSchema({
//         title,
//         amount,
//         category,
//         description,
//         date
//     })

//     try {
//         //validations
//         if(!title || !category || !description || !date){
//             return res.status(400).json({message: 'All fields are required!'})
//         }
//         if(amount <= 0 || !amount === 'number'){
//             return res.status(400).json({message: 'Amount must be a positive number!'})
//         }
//         await income.save()
//         res.status(200).json({message: 'Expense Added'})
//     } catch (error) {
//         res.status(500).json({message: 'Server Error'})
//     }

//     console.log(income)
// }

// exports.getExpense = async (req, res) =>{
//     try {
//         const incomes = await ExpenseSchema.find().sort({createdAt: -1})
//         res.status(200).json(incomes)
//     } catch (error) {
//         res.status(500).json({message: 'Server Error'})
//     }
// }

// exports.deleteExpense = async (req, res) =>{
//     const {id} = req.params;
//     ExpenseSchema.findByIdAndDelete(id)
//         .then((income) =>{
//             res.status(200).json({message: 'Expense Deleted'})
//         })
//         .catch((err) =>{
//             res.status(500).json({message: 'Server Error'})
//         })
// }

const xlsx = require('xlsx');
const Expense = require("../models/Expense");

//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const { title, amount, type, date, category, description } = req.body;

        // Validation: check for missing fields
        if (!title || !amount || !date || !type || !category || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            user: userId,
            title,
            amount,
            type,
            category,
            description,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

//Get All Expense  Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const expense = await Expense.findOneAndDelete({ _id: id, user: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error('Error deleting expense:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

//Download Excel
exports.downloadExpensesExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expenses.map((expense) => ({
            Title: expense.title,
            Amount: expense.amount,
            Category: expense.category,
            Description: expense.description,
            Date: expense.date.toLocaleDateString(),
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        // Add worksheet to workbook
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        // Generate buffer
        const excelBuffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=expenses.xlsx');

        // Send the file
        res.send(excelBuffer);
    } catch (error) {
        console.error('Error downloading expenses:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};