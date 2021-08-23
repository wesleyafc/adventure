const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes')
const cors = require('cors');



require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.set('view engine', 'ejs')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('DB connected'))




app.listen(process.env.PORT, () => {
    console.log('server is running')
})