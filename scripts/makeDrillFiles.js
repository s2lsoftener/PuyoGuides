const fs = require('fs')

// process.argv[i]
// [0]         [1]            [2]       [3]      [4]      [5]         [6]       [7]         [8]
// node makeDrillFiles.js inputjsonfile title outputdir outputname auto/manual autoreplace text
let inputJSON = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
let outputJSON = JSON.parse(JSON.stringify(inputJSON))
let title = process.argv[3]
let outputdir = process.argv[4]
let outputname = process.argv[5]
let replacementText = ''
let replacementMode = ''
if (process.argv[6] === undefined || process.argv[6] === 'auto') {
  replacementMode = 'auto'
} else if (process.argv[6] === 'manual') {
  replacementMode = 'manual'
  replacementText = process.argv[8]
}

// Replace slideText
if (replacementMode === 'auto' && process.argv[7] === 'false') {
  // Do nothing
} else {
  if (replacementMode === 'auto') {
    replacementText = outputJSON.fields[outputJSON.fields.length - 1].slideText
  }
  outputJSON.fields.forEach(element => {
    if (element.slideText === undefined || element.slideText === '...!') {
      element.slideText = replacementText
    }
  })
}

let markdown = ''
markdown += `---\ntitle: ${title}\n---\n`
markdown += `<ClientOnly><AssetLoader :reloadOnce="true" />\n`
markdown += `# ${title}\n\n<br><br>`
markdown += `<GameSlides :jsonFileToLoad="'${outputdir}/${outputname}.json'" :useRandomSeed="false" :useManualData="false" :replay="true"></GameSlides>\n\n`
markdown += `</ClientOnly>\n`

fs.writeFile(`drill_output/${outputname}.json`, JSON.stringify(outputJSON), function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('Saved JSON file to drill_output/')
})

fs.writeFile(`drill_output/${outputname}.md`, markdown, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('Saved markdown file to drill_output/')
})