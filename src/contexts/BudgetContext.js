import React, { useState, useContext } from "react"
import { v4 as uuidv4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

//creatig a Context provider to have access to all datat through application
//check the index.js file
export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    //get the specific expense
    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }]
          })
    }
    //adding new budget
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            //first avoiding budgets witht the same name (keeping the original array)
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            //adding new budget to an existing array
            return [...prevBudgets, {id: uuidv4(), name, max}]
        })
    }
    function deleteBudget({id}) {
        //if deleting the category, all the expenses will go to uncategorized
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
          })
    }

    return (
        <BudgetsContext.Provider 
        value={{
            budgets, 
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}
        >
            {children}
        </BudgetsContext.Provider>
    )
}