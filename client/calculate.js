function calculate(formula, operators) {
  const parsedFormula = parseFormula(formula)
  return calculateFormula(parsedFormula)
}

function parseFormula(formula) {
  const currentNumber = []
  const parsedFormula = []

  formula.forEach((element, index, array) =>{
    if (!operators.includes(element) && index !== array.length - 1) {
      currentNumber.push(element)
    } else if (index === array.length - 1) {
      currentNumber.push(element)
      parsedFormula.push(parseFloat(currentNumber.join('')))
    } else {
      parsedFormula.push(parseFloat(currentNumber.join('')))
      currentNumber.length = 0
      parsedFormula.push(element)
    }
  })

  return parsedFormula
}

function calculateFormula(parsedFormula) {
  while (parsedFormula.length >= 3) {
    const indexOfMultiply = getIndex('*', parsedFormula)
    const indexOfDivide = getIndex('/', parsedFormula)
    const indexOfPlus = getIndex('+', parsedFormula)
    const indexOfMinus = getIndex('-', parsedFormula)

    determineNextCalculation(indexOfMultiply, indexOfDivide, '*', '/', parsedFormula)

    if (indexOfMultiply === parsedFormula.length && indexOfDivide === parsedFormula.length) {
      determineNextCalculation(indexOfPlus, indexOfMinus, '+', '-', parsedFormula)
    }
  }

  return parsedFormula[0]
}

function calculateLeftAndRight(operator, operatorIndex, parsedFormula) {
  // operator = '+', parsedFormula = '2+2'
  const numberBeforeOperator = parsedFormula[operatorIndex - 1]
  const numberAfterOperator = parsedFormula[operatorIndex + 1]

  if (operator === '*') {
    return numberBeforeOperator * numberAfterOperator
  } else if (operator === '/') {
    return (numberBeforeOperator / numberAfterOperator)
  } else if (operator === '+') {
    return numberBeforeOperator + numberAfterOperator
  } else if (operator === '-') {
    return numberBeforeOperator - numberAfterOperator
  }
}

function getIndex(operator, parsedFormula) {
  if (parsedFormula.indexOf(operator) === -1) {
    return parsedFormula.length
  } else {
    return parsedFormula.indexOf(operator)
  }
}

function determineNextCalculation(index1, index2, operator1, operator2, parsedFormula) {
  if (index1 !== parsedFormula.length || index2 !== parsedFormula.length) {
    if (index1 < index2) {
      const solution = calculateLeftAndRight(operator1, index1, parsedFormula)
      parsedFormula.splice(index1 - 1, 3, solution)
    } else {
      const solution = calculateLeftAndRight(operator2, index2, parsedFormula)
      parsedFormula.splice(index2 - 1, 3, solution)
    }
  }
}

/*
---TESTING---
const operators = ["*", "/", "+", "-"]
const formula = '9*9*9-1*9-60/80-2/5'.split('')
console.log(calculate(formula, operators))
console.log(calculate(eval(formula)))
*/
