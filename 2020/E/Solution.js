const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1

function getSumCobination(N, K, level) {
  if (K < 0) {
    return null
  }
  if (K !== 0 && level === N) {
    return null
  }
  if (K === 0 && level === N) {
    return [[]]
  }

  let ans = []
  for (let i = 1; i <= N; i++) {
    let res = getSumCobination(N, K-i, level+1)
    if (res !== null) {
      res = res.map(r => [i, ...r])
      ans.push(...res)
    }
  }
  return ans
}

function initializeMatrix(N, trace) {
  let matrix = []
  for (let i = 0; i < N; i++) {
    let row = new Array(N).fill(0)
    row[i] = trace[i]
    matrix.push([...row])
  }
  return matrix
}

function initializeMap(trace) {
  let rowMap = {}, colMap = {}
  for (let i = 0; i < trace.length; i++) {
    rowMap[i.toString()] = {}
    rowMap[i.toString()][trace[i].toString()] = true
    colMap[i.toString()] = {}
    colMap[i.toString()][trace[i].toString()] = true
  }
  return {rowMap: rowMap, colMap: colMap}
}

function createMatrix(N, matrix, rowMap, colMap, row, col) {
  if (row === N) {
    return true // true for valid
  }
  if (col === N) {
    return createMatrix(N, matrix, rowMap, colMap, row+1, 0)
  }
  if (row === col) {
    return createMatrix(N, matrix, rowMap, colMap, row, col+1)
  }
  if (matrix[row][col] === 0) {
    for (let i = 1; i <= N; i++) {
      if (!rowMap[row.toString()][i.toString()] && !colMap[col.toString()][i.toString()]) {
        // try to choose this number
        matrix[row][col] = i
        rowMap[row.toString()][i.toString()] = true
        colMap[col.toString()][i.toString()] = true
        const isValid = createMatrix(N, matrix, rowMap, colMap, row, col+1)
        if (isValid) {
          return true
        } 
        matrix[row][col] = 0
        rowMap[row.toString()][i.toString()] = false
        colMap[col.toString()][i.toString()] = false
      }
    }
    // if trying all possible value
    return false
  }
  return false
}

function solve(N, K) {
  const combinations = getSumCobination(N, K, 0)
  if (!combinations.length) {
    return {outcome: 'IMPOSSIBLE', matrix: undefined}
  }
  for (let comb of combinations) {
    let matrix = initializeMatrix(N, comb)
    let { rowMap, colMap } = initializeMap(comb)
    const isValid = createMatrix(N, matrix, rowMap, colMap, 0, 0)
    if (isValid) {
      return {outcome: 'POSSIBLE', matrix: matrix}
    }
  }
  return {outcome: 'IMPOSSIBLE', matrix: undefined}
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  const [N, K] = line.split(' ').map(l => parseInt(l))
  const {outcome, matrix} = solve(N, K)
  console.log(`Case #${test}: ${outcome}`)
  if (typeof matrix !== 'undefined') {
    for (const row of matrix) {
      console.log(row.join(' '))
    }
  }
  test++
  if (test > testCases) {
    process.exit()
  }
})