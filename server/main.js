import Express from 'express'
import path from 'path'
import fs from 'fs'
import os from 'os'

let dataStr = fs.readFileSync(path.resolve('./server/general.json'), { encoding: 'utf8' })
let generalJson = JSON.parse(dataStr)
dataStr = fs.readFileSync(path.resolve('./server/parameters.json'), { encoding: 'utf8' })

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Filter for IPv4 and non-internal (skip loopback 127.0.0.1)
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback
}

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

app.listen(PORT, () => {
  console.info(`Server listening on port: ${PORT}`)
  console.log(`Server local IP Address: ${getLocalIp()}`)
})
