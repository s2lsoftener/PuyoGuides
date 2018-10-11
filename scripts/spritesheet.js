const fs = require('fs')

let color = ['red', 'green', 'blue', 'yellow', 'purple']
let connection = ['n', 'd', 'u', 'ud', 'r', 'rd', 'ur', 'urd', 'l', 'dl', 'ul', 'udl', 'rl', 'rdl', 'url', 'urdl']
let sprite = {
  tileWidth: 72,
  tileHeight: 72,
  trimmedWidth: 64,
  trimmedHeight: 60
}
let jsonBody = ''
let jsonAll = ''

jsonAll += `{\n  "frames": {\n`

for (let c = 0; c < color.length; c++) {
  for (let n = 0; n < connection.length; n++) {
    let textBlock = ''
    let colorPos = c * sprite.tileHeight
    let connectionPos = n * sprite.tileWidth

    textBlock += `    "${color[c]}_${connection[n]}.png": {\n`
    textBlock += `      "frame": {"x": ${connectionPos}, "y": ${colorPos}, "w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
    textBlock += `      "rotated": false,\n`
    textBlock += `      "trimmed": false,\n`
    textBlock += `      "spriteSourceSize": {"x": 0, "y": 0, "w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
    textBlock += `      "sourceSize": {"w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
    textBlock += `      "pivot": {"x": 0.5, "y": 0.5}\n`
    textBlock += `    },\n`

    jsonBody += textBlock
  }
}

jsonBody += `    "spacer_n.png": {\n`
jsonBody += `      "frame": {"x": 1900, "y": 500, "w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
jsonBody += `      "rotated": false,\n`
jsonBody += `      "trimmed": false,\n`
jsonBody += `      "spriteSourceSize": {"x": 0, "y": 0, "w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
jsonBody += `      "sourceSize": {"w": ${sprite.trimmedWidth}, "h": ${sprite.trimmedHeight}},\n`
jsonBody += `      "pivot": {"x": 0.5, "y": 0.5}\n`
jsonBody += `    }\n`
jsonBody += `  },\n`

jsonAll += jsonBody
jsonAll += `  "meta": {\n`
jsonAll += `    "app": "http://www.puyonexus.com",\n`
jsonAll += `    "version": "1.0",\n`
jsonAll += `    "image": "puyo_aqua.png",\n`
jsonAll += `    "format": "RGBA8888",\n`
jsonAll += `    "size": {"w": 2048, "h": 1024},\n`
jsonAll += `    "scale": "1"\n`
jsonAll += `  }\n`
jsonAll += `}`

fs.writeFile('spritesheet.json', jsonAll, function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('The file was saved!')
})
