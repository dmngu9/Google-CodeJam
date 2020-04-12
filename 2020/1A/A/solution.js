const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let testCases
let test = 1
let N = undefined
let regex = []

function processRegex(regex) {
  let longestPrefix = '', longestSuffix = '', exactMatch = ''
  let middle = []
  for (const r of regex) {
    if (r.indexOf('*') === -1) {
      if (!!exactMatch && exactMatch !== r) {
        return { valid: false }
      }
      exactMatch = r
      continue
    }
    const s = r.split('*')
    if (r[0] !== '*') {
      if (typeof longestPrefix === 'undefined') {
        longestPrefix = s[0]
      } else {
        const longer = s[0].length > longestPrefix.length ? s[0] : longestPrefix
        const shorter = s[0].length > longestPrefix.length ? longestPrefix : s[0]
        if (!longer.startsWith(shorter)) {
          return { valid: false }
        }
        longestPrefix = longer
      }
    }
    if (r[r.length - 1] !== '*' && s.length >= 1) {
      if (typeof longestSuffix === 'undefined') {
        longestSuffix = s[s.length - 1]
      } else {
        const longer = s[s.length - 1].length > longestSuffix.length ? s[s.length - 1] : longestSuffix
        const shorter = s[s.length - 1].length > longestSuffix.length ? longestSuffix : s[s.length - 1]
        if (!longer.endsWith(shorter)) {
          return { valid: false }
        }
        longestSuffix = longer
      }
    }
    if (s.length >= 3) {
      middle.push(...s.slice(1, s.length - 1).filter(e => e !== ''))
    }
  }
  if (!!exactMatch) {
    if (!exactMatch.startsWith(longestPrefix) || !exactMatch.endsWith(longestSuffix)) {
      return { valid : false }
    }
    for (const m of middle) {
      if (!exactMatch.includes(m)) {
        return { valid: false }
      }
    }
  }
  return {
    prefix: longestPrefix,
    suffix: longestSuffix,
    middle: middle,
    exactMatch: exactMatch,
    valid: true
  }
}

function solve(regex) {
  const { prefix, suffix, middle, exactMatch, valid } = processRegex(regex)
  if (!valid) {
    return '*'
  }
  if (!!exactMatch) {
    return exactMatch
  }
  let res = prefix
  for (const m of middle) {
    res = res + m
  }
  return res + suffix
}

rl.on('line', line => {
  if (typeof testCases === 'undefined') {
    testCases = parseInt(line)
    return
  }
  if (typeof N === 'undefined') {
    N = parseInt(line)
    return
  }
  regex.push(line)
  if (regex.length < N) {
    return
  }
  const ans = solve(regex)
  console.log(`Case #${test}: ${ans}`)
  test++
  N = undefined
  regex = []
  if (test > testCases) {
    process.exit()
  }
})



