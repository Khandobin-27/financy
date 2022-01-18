import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../Util'
import '../styles/BudgetCard.css'

export default function BudgetCard({
    name, 
    amount, 
    max,
    openAddExpenseClick,
    onViewExpensesClick,
    hideButtons
}) {
    const classNames= []
    //red background will overwrite the gray background, becasue it is first in the condition
    //and if the limit is reached, red must override gray
    if (amount > max) {
        classNames.push('rgb(255, 124, 124)')
    } else {
        classNames.push('rgb(255, 255, 255)')
    }

    return (
        <Card style={{ backgroundColor: `${classNames.join(' ')}`}}>
            <Card.Body>
                <Card.Title 
                className='d-flex justify-content-between align-items-baseline fw-normal mb-3'
                >
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currencyFormatter.format(amount)}
                        {/*simple ternary check that if there is no max value, then do not display it*/}
                        {max && (
                            <span className='text-muted fs-6 ms-1'> 
                            / {currencyFormatter.format(max)} 
                            </span>
                        )}
                    </div>
                </Card.Title>
                {/*same simple ternary check for the progress bar*/}
                {max && (
                    <ProgressBar 
                    className='rounded-pill' 
                    variant = {getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                    />
                )}
                {/*not showing the buttons when hiddeBUtton prop applied*/}
                { !hideButtons && (
                    <Stack direction='horizontal' gap='2' className='mt-4'>
                        <Button 
                        variant='secondary' 
                        className='ms-auto margin-right'
                        onClick={openAddExpenseClick}
                        size='md'
                        >
                        Add Expense
                        </Button>
                        <Button 
                        variant='outline-secondary'
                        onClick={onViewExpensesClick}
                        >
                        View Expenses
                        </Button>
                    </Stack>
                )}
            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return 'success' //green
    if (ratio < 0.75) return 'warning' //yellow
    return 'danger' //red
}