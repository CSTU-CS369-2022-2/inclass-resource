// file: index.js
import express from 'express';
import logger from 'morgan';

// routers
import productRouter from './router/productRouter.js'; 
// our own modules need to put file extension .js

const app = express();
const PORT = 4000;

// middleware logger
app.use(logger('short'));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// routes
app.use('/api/product', productRouter);

app.get('/', (req, res) => {  res.status(401).send({error:'Invalid Endport'}); });
app.get('*', (req, res) => { 
    res.status(404).json(new Error("Not Found Page!"+ req.url))
})

// for error handling
app.use((err, req, res, next) => {
    console.error(`${err.name}: ${err.message}`)
    res.status(500).send(err.message);
})

// make server start listening on a specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
