//const { calculate } = require('./calculate.js')
const formula = []
const operators = ["*", "/", "+", "-"]

$(document).ready(function() {
  $('.operations').on('click', function(event) {
    const userInput = $(event.target).val()

    if (operators.includes(formula[formula.length - 1])) {
      if (operators.includes(userInput)) {
        formula.pop()
        formula.push(userInput)
      }
      else {
        formula.push(userInput)
      }
    } else {
      formula.push(userInput)
    }

    if (formula.length === 1 && operators.includes(formula[0])) {
      formula.length = 0
    }

    formulaString = formula.join('')

    $('textarea').val(formulaString)
  })

  $('#equals').on('click', function(event) {
    if (formula.length !== 0) {
      createSolution(formula)
    }
  })

  $('#clear').on('click', function(event) {
    formula.length = 0
    $('textarea').val('')
  })
})

function createSolution(formula) {
  const solution = calculate(formula, operators)
  $('textarea').val(formula.join('') + '\n=' + solution)
  formula.length = 0
  formula.push(solution)
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
