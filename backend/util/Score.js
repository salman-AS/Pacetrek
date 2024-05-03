// require('dotenv').config()
// const jwt = require('jsonwebtoken')

module.exports.getScore = (student) => {
    const aptitudes = student.aptitude
    const courseworks = student.coursework
    const codes = student.code
    const aptitudeScore = aptitudes.reduce((acc, aptitude) => acc + aptitude.mark, 0)
    const courseworkScore = courseworks.reduce((acc, coursework) => acc + coursework.mark, 0)
    const codeScore = codes.reduce((acc, code) => acc + code.mark, 0)
    return aptitudeScore + courseworkScore + codeScore + student.cgpa * 10
}
