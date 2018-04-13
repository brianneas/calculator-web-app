const formula = []
const currentNumber = []
const operators = ["*", "/", "+", "-"]

$(document).ready(function() {
  $('.operations').on('click', function(event) {
    const userInput = $(event.target).val()

    formula.push(userInput)

    formulaString = formula.join('')

    $('textarea').val(formulaString)
  })

  $('.operator').on('click', function(event) {
    const userInput = $(event.target).val()

    if (operators.includes(formula[formula.length - 1])) {
      formula.pop()
      formula.push(userInput)
    } else {
      formula.push(userInput)
    }

    if (formula.length === 1 && operators.includes(formula[0])) {
      formula.length = 0
    }
  })

  $('.equals').on('click', function(event) {
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
