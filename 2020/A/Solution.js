const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

function hasRepeatedElement(A) {
  let memo = {}
  for (let e of A) {
    if (memo[e.toString()]) {
      return true
    }
    memo[e.toString()] = true
  }
  return false
}



let testCases
let tests = 1
let matrixSize
let matrixCreationLine = 1
let matrix = []

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof matrixSize === 'undefined') {
    matrixSize = parseInt(line)
    return
  }
  const entries = line.split(' ').map(l => parseInt(l))
  matrix.push(entries)
  matrixCreationLine++
  if (matrixCreationLine <= matrixSize) {
    return
  }
  
  let trace = 0, rowDiff = 0, colDiff = 0
  for (let i = 0; i < matrixSize; i++) {
    trace = trace + matrix[i][i]
    // check row Diff 
    if (hasRepeatedElement(matrix[i])) {
      rowDiff++
    }
    // check Col diff
    let col = []
    for (let j = 0; j < matrixSize; j++) {
      col.push(matrix[j][i])
    }
    if (hasRepeatedElement(col)) {
      colDiff++
    }
  }
  console.log(`Case #${tests}: ${trace} ${rowDiff} ${colDiff}`)

  matrixSize = undefined
  matrixCreationLine = 1
  matrix = []
  tests++
  if (tests > testCases) {
    process.exit()
  }
})