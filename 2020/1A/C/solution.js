const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  out: process.stdout,
  terminal: false
})

let testCases 
let test = 1
let R
let C 
let floor = []

function getCompass(r, c, floor) {
  let sum = 0
  let count = 0
  let tempR = r, tempC = c
  // up
  while(tempR - 1 >= 0) {
    if (floor[tempR-1][c] !== -1) {
      sum = sum + floor[tempR-1][c]
      count++
      break
    }
    tempR--
  }
  tempR = r
  // down 
  while(tempR + 1 < floor.length) {
    if (floor[tempR+1][c] !== -1) {
      sum = sum + floor[tempR+1][c]
      count++
      break
    }
    tempR++
  }

  // left
  while (tempC - 1 >= 0) {
    if (floor[r][tempC-1] !== -1) {
      sum = sum + floor[r][tempC-1]
      count++
      break
    }
    tempC--
  }

  // right 
  tempC = c
  while (tempC + 1 < floor[r].length) {
    if (floor[r][tempC+1] !== -1) {
      sum = sum + floor[r][tempC+1]
      count++
      break
    }
    tempC++
  }
  if (count !== 0) {
    return sum / count
  }
  return 0
}

function solve(R, C, floor) {
  let size = R * C 
  let sum = 0
  let coords = []
  while (size > 0) {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (floor[i][j] === -1) {
          continue
        }
        sum = sum + floor[i][j]
        const average = getCompass(i, j, floor)
        if (average > floor[i][j]) {
          coords.push([i, j])
        }
      }
    }
    if (!coords.length) {
      break
    }
    size = size - coords.length
    for (const co of coords) {
      const [i, j] = co
      floor[i][j] = -1
    }
    coords = []
  }

  return sum
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof R === 'undefined' && typeof C === 'undefined') {
    const [a, b] = line.split(' ').map(l => parseInt(l))
    R = a
    C = b
    return
  }
  const row = line.split(' ').map(l => parseInt(l))
  floor.push(row)
  if (floor.length !== R) {
    return
  }
  const ans = solve(R, C, floor)
  console.log(`Case #${test}: ${ans}`)
  test++
  R = undefined
  C = undefined
  floor = []
  if (test > testCases) {
    process.exit()
  }
})