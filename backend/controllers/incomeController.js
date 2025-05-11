// const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add Income Source
exports.addIncome = async (req, res) => {
    console.log('User making the request:', req.user);
    const userId = req.user._id; // ✅ Use _id if using Mongoose user document

    try {
        const { title, amount, type, date, category, description } = req.body;

        // Validation: check for missing fields
        if (!title || !amount || !date || !type || !category || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            user: userId, // ✅ Use 'user' if your Income model uses a 'user' field, not 'userId'
            title,
            amount,
            type,
            category,
            description,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome); // ✅ 201 is better for resource creation
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ user: userId }).sort({ date: -1 }); // ✅ Again, use 'user' if that's the model field
        res.status(200).json(income);
    } catch (error) {
        console.error('Error fetching income:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const income = await Income.findOneAndDelete({ _id: id, user: userId });

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error('Error deleting income:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// const xlsx =require('xlsx');
// const  Income =require("../models/Income");

// //Add Expense Source
// exports.addIncome=async(req , res)=>{

//     console.log('User making the request:', req.user);
//     const userId = req.user.id;

//     try{
//         const { title ,amount , type , date, category, description}=req.body;

//         //Validation: check for missing fields
//         if(!title || !amount || !date || !type || !category || !description){
//             return res.status(400).json({message:"All fields are required "});
//         }

//         const newIncome = new Income({
//             userId,
//             title,
//             amount,
//             type,
//             category,
//             description,
//             date:new Date(date),
//         });
//         await newIncome.save();
//         res.status(200).json(newIncome);
//     }catch(error) {
//         res.status(500).json({message:"Server Error"});
//     }
// };

// //Get All Income  Source
// exports.getAllIncome = async(req,res)=>{
//     const userId=req.user.id;

//     try{
//         const income = await Income.find({userId}).sort({date:-1});
//         res.json(income);
//     }catch(error){
//         res.status(500).json({message:"Server Error"});
//     }
// };

// //Delete Income Source
// /* exports.deleteIncome=async(req,res)=>{
//     try{
//         await Income.findByIdAndDelete(req.params.id);
//         res.json({message:"Income delete successfully"});
//     }catch(error){
//         res.status(500).json({message:"Server Error"});
//     }
// }; */

// //Download Excel
// /* exports.downloadIncomeExcel=async(req,res)=>{
//     const userId=req.user.id;
//     try{
//         const income = await Income.find({userId}).sort({date:-1});

//         //prepare data for Excel
//         const data = income.map((item)=>({
//             Source: item.source,
//             Amount:item.amount,
//             Date: item.date,
//         }));

//         const wb = xlsx.utils.book_new();
//         const ws = xlsx.utils.json_to_sheet(data);
//         xlsx.utils.book_append_sheet(wb,ws,"Income");
//         xlsx.writeFile(wb,'income_details.xlsx');
//         res.download('income_details.xlsx');
//     }catch(error){
//         res.status(500).json({message:"Server Error"});
//     }
// };*/
