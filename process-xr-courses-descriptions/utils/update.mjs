import fs from 'fs';
const information = JSON.parse(fs.readFileSync('assets/courseLinks.json', 'utf-8'))

export const updateCourseInfo = (list) => {
  list.forEach(item => {
    const name = item.name
    const index = information.findIndex(course => course.title.includes(name))
    information[index].description = item.descriptions.map(i => i.text).join('; ')
    information[index].keywords = item.keywords
  })
  return information
}