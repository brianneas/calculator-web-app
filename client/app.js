const formula = []
const currentNumber = []
const operators = ["*", "/", "+", "-"]

$(document).ready(function() {
  $('.number').on('click', function(event) {
    const userInput = $(event.target).val()

    currentNumber.push(userInput)

    printTextArea()
  })

  $('.operator').on('click', function(event) {
    pushCurrentNumber()

    const userInput = $(event.target).val()

    if (formula.length === 1 && operators.includes(formula[0])) {
      formula.length = 0
    }

    if (operators.includes(formula[formula.length - 1])) {
      formula.pop()
      formula.push(userInput)
    } else {
      formula.push(userInput)
    }

    currentNumber.length = 0

    printTextArea()
  })

  $('.equals').on('click', function(event) {
    if (formula.length !== 0) {
      pushCurrentNumber()
      createSolution(formula)
    }

    currentNumber.length = 0
  })

  $('.neg').on('click', function(event) {
    if (currentNumber.length === 0) {
      return
    }

    if (currentNumber[0] !== '-') {
      currentNumber.unshift('-')
    } else {
      currentNumber.shift()
    }

    printTextArea()
  })

  $('#clear').on('click', function(event) {
    formula.length = 0
    currentNumber.length = 0
    $('textarea').val('')
  })
})

function createSolution(formula) {
  const solution = calculate(formula, operators)
  $('textarea').val(formula.join('') + '\n=' + solution)
  formula.length = 0
  formula.push(solution)
}

function printTextArea() {
  if (currentNumber.length !== 0) {
    const newFormula = formula.concat(currentNumber)
    const formulaString = newFormula.join('')

    $('textarea').val(formulaString)

    return
  }

  const formulaString = formula.join('')

  $('textarea').val(formulaString)
}

function pushCurrentNumber() {
  if (currentNumber.length !== 0) {
    formula.push(parseFloat(currentNumber.join('')))
    currentNumber.length = 0
  }
}
