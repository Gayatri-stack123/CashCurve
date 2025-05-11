import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    // Fetch incomes only once when component mounts
    useEffect(() => {
        getIncomes();
    }, []);

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axiosInstance.post(`income/add`, income);
            setIncomes(prevIncomes => [...prevIncomes, response.data]);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income');
            throw err;
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axiosInstance.get(`income/get`);
            setIncomes(response.data || []);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes');
            setIncomes([]);
            throw err;
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(`income/delete/${id}`);
            setIncomes(prevIncomes => prevIncomes.filter(income => income._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income');
            throw err;
        }
    }

    const totalIncome = () => {
        let total = 0;
        incomes.forEach((income) => {
            total = total + (income.amount || 0);
        });
        return total;
    }

    //calculate expenses
    const addExpense = async (expense) => {
        try {
            const response = await axiosInstance.post(`expense/add`, expense);
            setExpenses(prevExpenses => [...prevExpenses, response.data]);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense');
            throw err;
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axiosInstance.get(`expense/get`);
            setExpenses(response.data || []);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses');
            setExpenses([]);
            throw err;
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(`expense/delete/${id}`);
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense');
            throw err;
        }
    }

    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) => {
            total = total + (expense.amount || 0);
        });
        return total;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}