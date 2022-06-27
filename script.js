class Calculator {
    constructor(prevOperandTextElemnt, currOperandTextElemnt) {
        this.prevOperandTextElemnt = prevOperandTextElemnt
        this.currOperandTextElemnt = currOperandTextElemnt
        this.clear()
    }

    // AC Button
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    // DELL Button
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    // Add Number
    appendNumber(number) {
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    // Operation
    choooseOperation(operation) {
        if(this.currOperand === '') return
        if(this.prevOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+':
                computation = prev + curr
                break
            case '÷':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            case '-':
                computation = prev - curr
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay() {
        this.currOperandTextElemnt.innerText = this.currOperand
        this.prevOperandTextElemnt.innerText = this.prevOperand
    }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandTextElemnt = document.querySelector('[data-prev-operand]')
const currOperandTextElemnt = document.querySelector('[data-curr-operand]')



const calculator = new Calculator(prevOperandTextElemnt, currOperandTextElemnt)

// Typing Numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Typing Operation
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.choooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Calculating Value
equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

// Clear
allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

// Dell
deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})