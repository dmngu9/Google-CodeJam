const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases 
let test = 1
let N 
let S = 500

function getPascalVal(r, k, pascal) {
  if (pascal[`${r}-${k}`]) {
    return pascal[`${r}-${k}`]
  }
  if (r === k || k === 1) {
    pascal[`${r}-${k}`] = 1
    return 1
  }
  pascal[`${r}-${k}`] = getPascalVal(r-1,k -1, pascal) + getPascalVal(r-1, k, pascal)
  return pascal[`${r}-${k}`]
}

// (ri - 1, ki - 1), (ri - 1, ki), (ri, ki - 1), (ri, ki + 1), (ri + 1, ki), (ri + 1, ki + 1).
function DFS (N, S, pos, list, memo, pascal) {
  if (N < 0) {
    return false
  }
  if (N !== 0 && S < 0) {
    return false
  }
  if (N === 0 && S >= 0 && S <= 500) {
    return true
  }
  const [r, k] = pos

  let order = []
  if (r+1 > 0 && k+1 > 0 && k+1 <= r+1 && !memo[`${r+1}-${k+1}`]) {
    getPascalVal(r+1, k+1, pascal)
    order.push([r+1, k+1, pascal[`${r+1}-${k+1}`]])
  }
  if (r > 0 && k+1 > 0 && k +1 <= r && !memo[`${r}-${k+1}`]) {
    getPascalVal(r, k+1, pascal)
    order.push([r, k+1, pascal[`${r}-${k+1}`]])
  }
  if (r+1 > 0 && k > 0 && k <= r && !memo[`${r+1}-${k}`]) {
    getPascalVal(r+1, k, pascal)
    order.push([r+1, k, pascal[`${r+1}-${k}`]])
  }
  if (r-1 > 0 && k-1 > 0 && k-1 <= r-1 && !memo[`${r-1}-${k-1}`]) {
    getPascalVal(r-1, k-1, pascal)
    order.push([r-1, k-1, pascal[`${r-1}-${k-1}`]])
  }
  if (r-1 > 0 && k > 0 && k <= r -1 && !memo[`${r-1}-${k}`]) {
    getPascalVal(r-1, k, pascal)
    order.push([r-1, k, pascal[`${r-1}-${k}`]])
  }
  if (r > 0 && k -1 > 0 && k - 1 <=r && !memo[`${r}-${k-1}`]) {
    getPascalVal(r, k-1, pascal)
    order.push([r, k-1, pascal[`${r}-${k-1}`]])
  }
  order.sort((a , b) => b[2] - a[2])

  for (const o of order) {
    const [nr, nk , val] = o
    memo[`${nr}-${nk}`] = true
    list.push([nr, nk])
    let valid = DFS(N - val, S - 1, [nr, nk], list, memo, pascal)
    if (!valid) {
      list.pop()
    } else {
      return true
    }
  }
  
  return false
}

function solve(N, S) {
  let pascal = {'1-1': 1, '2-1': 1, '2-2': 1}
  let list = [[1, 1]]
  let memo = {'1-1': true}
  DFS(N - 1, S - 1, [1,1], list, memo, pascal)
  return list
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined') {
    N = parseInt(line)
  }

  const ans = solve(N, S)
  console.log(`Case #${test}:`)
  for (const r of ans) {
    console.log(`${r[0]} ${r[1]}`)
  }
  test++
  N = undefined
  if (test > testCases) {
    process.exit()
  }
})