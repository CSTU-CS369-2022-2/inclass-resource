import express from 'express'
import logger from 'morgan'
import * as dotenv from 'dotenv'
import * as url from 'url'
import mongooseDbConnect from './config/dbConnect.js'

// authorization
import verifyJWT from './middleware/verifyJWT.js'

// routers
import productRouter from './router/productRouter.js'
import userRouter from './router/userRouter.js'
import authRouter from './router/authRouter.js'
import ordersRouter from './router/ordersRouter.js'

const app = express()

dotenv.config()
const PORT = process.env.PORT || 4000

mongooseDbConnect()

// middleware logger
app.use(logger('short'))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//serve static files
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
app.use('/', express.static(__dirname + '/public'))

// routes
app.use('/auth', authRouter) // register, login, logout, refreshToken

// test to verify JWT
app.get('/secret', verifyJWT, (req, res) =>
	res.json({ success: true, message: 'Secret Page' })
)

// REST for products or user
app.use('/api/product', productRouter)
app.use('/api/user', verifyJWT, userRouter)
app.use('/api/orders', ordersRouter)

app.get('/', (req, res) => {
	res.status(401).send({ error: 'Invalid Endport' })
})
app.get('*', (req, res) => {
	res.status(404).json(new Error('Not Found Page!' + req.url))
})

// for error handling
app.use((err, req, res, next) => {
	console.error(`${err.name}: ${err.message}`)
	res.status(500).send(err.message)
})

// make server start listening on a specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
