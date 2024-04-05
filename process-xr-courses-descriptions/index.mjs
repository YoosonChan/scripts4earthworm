import fs from 'fs';
import WordExtractor from 'word-extractor';
import { extractDescription, extractKeywords } from './utils/extractor.mjs';
import { updateCourseInfo } from './utils/update.mjs';
// Initialize
const fileList = fs.readdirSync('summary')
const extractor = new WordExtractor()
// Process the .docx file content
let summary = []
for (let i = 0; i < fileList.length; i++) {
  const file = fileList[i]
  // ignore the preview file of the .docx file
  if (!/^~\$\d[\S\s]+(.docx)$/.test(file)) {
    const result = await extractor.extract(`summary/${file}`)
    const list = result.getBody().split('\n').filter(line => !!line.length)
    summary.push({
      name: /【\S+(\d){1,2}(.\d){0,1}】/.exec(list)[0],
      keywords: extractKeywords(list),
      descriptions: extractDescription(list)
    })
  }
  console.log(`proccessing...(${(100 / fileList.length * (i + 1)).toFixed(2)}%)`);
}
console.log('process done.');
// Remove the old outputed file
try {
  if (fs.existsSync('output/summary.json'))
    fs.unlinkSync('output/summary.json')
  if (fs.existsSync('output/courseLinks.json'))
    fs.unlinkSync('output/courseLinks.json')
  console.log('deleted.');
} catch (error) {
  console.log(error);
}
// Output the summary file
if (!fs.existsSync('output')) fs.mkdirSync('output')
fs.writeFileSync('output/summary.json', JSON.stringify(summary), 'utf-8')
console.log('output summary done.');
// Update information file
const information = updateCourseInfo(summary)
// Output the summary file
fs.writeFileSync('output/courseLinks.json', JSON.stringify(information), 'utf-8')
console.log('output information done.');