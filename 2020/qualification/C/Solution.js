const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1

let numberOfTasks
let tasks = []

function solve(tasks) {
  tasks = tasks.map((t, i) => [...t, i]).sort((a, b) => a[0] - b[0])
  let JHigh = 0, CHigh = 0
  let res = 'X'.repeat(tasks.length)

  for (let task of tasks) {
    if (task[0] >= JHigh) {
      JHigh = task[1]
      res = res.slice(0, task[2]) + 'J' + res.slice(task[2] + 1)
      continue
    }
    if (task[0] >= CHigh) {
      CHigh = task[1]
      res = res.slice(0, task[2]) + 'C' + res.slice(task[2] + 1)
      continue
    }
    return 'IMPOSSIBLE'
  }
  return res
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof numberOfTasks === 'undefined') {
    numberOfTasks = parseInt(line)
    return
  }
  const task = line.split(' ').map(l => parseInt(l))
  tasks.push(task)
  if (tasks.length < numberOfTasks) {
    return
  }
  const ans = solve(tasks)

  console.log(`Case #${test}: ${ans}`)
  numberOfTasks = undefined
  tasks = []
  test++
  if (test > testCases) {
    process.exit()
  }
})