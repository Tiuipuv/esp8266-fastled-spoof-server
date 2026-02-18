import Express from 'express'
import path from 'path'
import fs from 'fs'

let dataStr = fs.readFileSync(path.resolve('./server/general.json'), { encoding: 'utf8' })
let generalJson = JSON.parse(dataStr)
dataStr = fs.readFileSync(path.resolve('./server/parameters.json'), { encoding: 'utf8' })
let parameterJson = JSON.parse(dataStr)

const app = new Express()
const PORT = 80

app.use((req, res, next) => {
  console.log(`${req.method} method: ${req.url}`)
  next()
})

// all data routes are under data
// app.use('', dataRouter)
app.get('/all', (req, res) => {
  res.json(generalJson)
})
app.get('/parameters', (req, res) => {
  res.json(parameterJson)
})
app.post('/formGeneralValue', (req, res) => {
  res.sendStatus(200)
})
app.post('/formParametersValue', (req, res) => {
  res.sendStatus(200)
})
app.listen(PORT, 'localhost', () => {
  console.info(`Server listening on port ${PORT}`)
})
