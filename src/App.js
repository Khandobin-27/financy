import React, { useState } from 'react';
import { Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import './styles/App.css'
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetContext'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  //creating this to know exactly which category to add expense in the card (current expense category by deafult choice)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-5 mt-4'>
          <h1 className='me-auto title'>Financy</h1>
          <button className='add-btn-budget' onClick={() => setShowAddBudgetModal(true)}> Add Budget </button>
          {/*open expense modal for the general(top) expense button*/}
          <button className='add-btn-expense' onClick={openAddExpenseModal}> Add Expense </button>
        </Stack>
        <div className='grid'>
          {/*budgets is coming from the context (array of all budgets)*/}
          {/*reduce methid aloows to calculate and showe the total expense of a separate card*/}
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard 
              key={budget.id}
              name={budget.name}
              amount={amount} 
              max={budget.max}
              //open expense modal for the particular card
              openAddExpenseClick={() => openAddExpenseModal(budget.id)}
              //open for expenses card view
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.id)
              }

            />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
     
  );
}

export default App;
