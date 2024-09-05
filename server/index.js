const Dotenv = require("dotenv").config({ path: "./config.env" })
const express = require("express")
const App = express()

const PORT = process.env.PORT

App.listen(PORT, () => {
    console.log(`server is running on ${PORT} Port `)
})