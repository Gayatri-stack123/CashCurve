const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
/* const xlsx =require('xlsx');
const  Expense =require("../models/Expense");

//Add Expense Source
exports.addExpense=async(req , res)=>{
    const userId = req.user.id;

    try{
        const { icon , category , amount , date }=req.body;

        //Validation: check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required "});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date:new Date(date),
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(error) {
        res.status(500).json({message:"Server Error"});
    }
};

//Get All Expense  Source
exports.getAllExpense = async(req,res)=>{
    const userId=req.user.id;
    
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//Delete Expense Source
exports.deleteExpense=async(req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense delete successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//Download Excel
exports.downloadExpenseExcel=async(req,res)=>{
    const userId=req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});

        //prepare data for Excel
        const data = expense.map((item)=>({
            Source: item.source,
            Amount:item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};
 */