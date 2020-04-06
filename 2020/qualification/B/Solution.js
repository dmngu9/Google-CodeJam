const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1


function solve(S) {
  let openBrackets = parseInt(S[0])
  let res = ''
  for (let i = 0; i < openBrackets; i++) {
    res = res + '('
  }
  res = res + S[0]
  for (let i = 1; i < S.length; i++) {
    const current = parseInt(S[i])
    if (current === openBrackets) {
      res = res + S[i]
    } else if (current < openBrackets) {
      const amountToPop = openBrackets - current
      for (let j = 0; j < amountToPop; j++) {
        res = res + ')'
      }
      res = res + S[i]
      openBrackets = openBrackets - amountToPop
    } else {
      const amountToAdd = current - openBrackets
      for (let j = 0; j < amountToAdd; j++) {
        res = res + '('
      }
      res = res + S[i]
      openBrackets = openBrackets + amountToAdd
    }
  }
  if (openBrackets > 0) {
    for (let i = 0; i < openBrackets; i++) {
      res = res + ')'
    }
  }
  return res
}
rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  let S = line
  const ans = solve(S)
  console.log(`Case #${test}: ${ans}`)
  test++
  if (test > testCases) {
    process.exit()
  }
})