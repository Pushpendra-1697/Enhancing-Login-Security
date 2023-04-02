const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { connection } = require('./Configs/Config');
const { registerRoute } = require('./Routes/register.route');
const { loginRoute } = require('./Routes/login.route');

//Inbuilt middlewares;
app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', async (req, res) => {
    res.send('Welcome in Cointab');
});

app.use('/', registerRoute);
app.use('/', loginRoute);

httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (err) {
        console.log('Error in connection to DB');
    }
    console.log(`Server is listening on ${PORT}`);
});


