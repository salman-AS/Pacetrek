// require('dotenv').config()
// const jwt = require('jsonwebtoken')

module.exports.getScore = (student) => {
    let score = 0
    if (student.aptitude) {
        const aptitudes = student.aptitude
        let aptitudeScore = aptitudes.reduce((acc, aptitude) => acc + aptitude.mark, 0)
        score+=aptitudeScore
        console.log(aptitudes, aptitudeScore, score)
    }
    if (student.coursework) {
        const courseworks = student.coursework
        let courseworkScore = courseworks.reduce((acc, coursework) => acc + coursework.mark, 0)
        score+=courseworkScore
        console.log(courseworks, courseworkScore, score)
    }
    if (student.code) {
        const codes = student.code
        let codeScore = codes.reduce((acc, code) => acc + code.mark, 0)
        score+=codeScore
        console.log(codes, codeScore, score)
    }
    return score + student.cgpa*10
}