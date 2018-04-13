//const { calculate } = require('./calculate.js')
const formula = []
const currentNumber = []
const operators = ["*", "/", "+", "-"]

$(document).ready(function() {
  $('.number').on('click', function(event) {
    const userInput = $(event.target).val()

    currentNumber.push(userInput)

    console.log(currentNumber)

    console.log(formula)

    $('textarea').val(formula.join('') + currentNumber.join(''))
  })

  $('.operator').on('click', function(event) {
    const userInput = $(event.target).val()

    if (operators.includes(formula[formula.length - 1]) && operators.includes(userInput) && currentNumber.length !== 0) { // if an operator is already in the formula as the last entry, it replaces the last operator with the user input
      formula.pop()
      formula.push(userInput)
      return
    }

    if (formula.length === 0 && operators.includes(userInput)) { // checks if someone added an operator with no number before it
      return
    }

    pushParsedNumber()
    formula.push(userInput)

    console.log(formula)

    $('textarea').val(formula.join(''))
  })

  $('#equals').on('click', function(event) {
    console.log(formula)
    console.log(currentNumber)

    if (currentNumber.length !== 0) {
      pushParsedNumber()
      createSolution(formula)
    } else if (operators.includes(formula[formula.length - 1])) { // Checks to see if the last entry was a number
      $('textarea').val(formula.join('') + '\n' + 'Finish your equation!')
    } else {
      $('textarea').val('Make a calculation!')
    }
  })

  $('#clear').on('click', function(event) {
    formula.length = 0
    currentNumber.length = 0
    $('textarea').val('')
  })
})

function createSolution(formula) {
  console.log(formula)
  const solution = calculate(formula, operators)
  $('textarea').val(formula.join('') + '\n=' + solution)
  formula.length = 0
  formula.push(solution)
}

function pushParsedNumber() {
  if (currentNumber.length !== 0) {
    const parsedCurrentNumber = parseFloat(currentNumber.join(''))
    formula.push(parsedCurrentNumber)
    currentNumber.length = 0
  }
}

/*
function calculate(formulaString) {
  try {
    return eval(formulaString)
  }
  catch(err) {
    return ''
  }
}
*/
