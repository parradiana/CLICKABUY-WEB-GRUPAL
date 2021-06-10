require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
require('./config/database.js')
const app = express()
require("./config/passport")
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(express.json())
app.use(fileUpload())



app.use('/api', router)



// app.listen(4000, () => console.log("App listening on port 4000"))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"))
    })
}

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT

app.listen(port, host, () => console.log("App listening on port " + port + "  on " + host))














