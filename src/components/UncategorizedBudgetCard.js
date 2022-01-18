import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
      )

      //dont show the card when the amount is 0
      if (amount === 0) return null

    return (
        <BudgetCard 
        {...props}
        name='Uncategorized'
        gray
        amount={amount}
        />
    )
}
