const fs = require('fs')
const Chainsim = require('./chainsim.js')

let jsonfile = process.argv[2]
let slides = JSON.parse(fs.readFileSync(jsonfile, 'utf8'))

const fieldSettings = {
  columns: 6,
  visibleRows: 12,
  hiddenRows: 1,
  totalRows: 13,
  puyoToClear: 4,
  colorBonus: [0, 3, 6, 12, 24],
  groupBonus: [0, 2, 3, 4, 5, 6, 7, 10],
  chainPower: [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672],
  targetPoint: 70
}

const isPopping = function (matrix) {
  for (let y = 0; y < fieldSettings.totalRows; y++) {
    for (let x = 0; x< fieldSettings.columns; x++) {
      if (matrix[y][x] === true) {
        return true
      }
    }
  }
  return false
}

// Determine which slides have pops going on
let poppingSlides = []
for (let i = 0; i < slides.length; i++) {
  let fieldText = slides[i].fieldData
  let fieldMatrix = Chainsim.stringTo2dArray(fieldText, fieldSettings.totalRows, fieldSettings.columns)
  let fieldObject = new Chainsim.Field(fieldSettings, fieldMatrix)
  let popResult = Chainsim.Simulate.clearPuyos(fieldObject)
  let popBoolean = popResult.animationMatrix
  if (isPopping(popBoolean)) {
    poppingSlides[i] = true
  } else {
    poppingSlides[i] = false
  }
}

// Working from the last slide, update the preceeding slides 
let currentShadowField = ''
for (let i = slides.length - 1; i >= 0; i--) {
  if (poppingSlides[i] === true) {
    currentShadowField = slides[i].fieldData
  }
  slides[i].shadowData = currentShadowField
  slides[i].advanceNext = true
  slides[i].slideText = '...!'
}

// Log next queue
let nextQueue = ''
for (let i = 1; i < slides.length - 1; i++) {
  nextQueue += slides[i].puyoPair
}

console.log(nextQueue)

fs.writeFile('test_output.json', JSON.stringify(slides), function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('The file was saved!')
})
