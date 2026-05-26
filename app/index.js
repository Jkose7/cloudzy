const express = require('express')
const { Client } = require('pg')
const app = express()
const port = 3000
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

app.get('/', async (req, res) => {
  const client = new Client(dbConfig)
  let dbStatus = "Desconectado"

  try {
    await client.connect()
    dbStatus = "Conexión Exitosa a PostgreSQL"
    await client.end()
  } catch (err) {
    dbStatus = `Error de conexión: ${err.message}`
  }

  res.json({
    proyecto: "Cloudzy",
    estado_api: "Online",
    estado_base_datos: dbStatus,
  })
})

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`)
})