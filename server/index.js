import express from 'express'
import logger from 'morgan'

const app = express()
const port = 4000

app.use(logger('short'))
app.use(express.json())

app.get('/', (req, res) => {
	res.end('HelloWorld')
})

const Products = [
	{
		category: 'Sporting Goods',
		price: 49.99,
		stocked: true,
		name: 'Football',
		id: '1234',
	},
	{
		category: 'SportingGoods',
		price: 9.99,
		stocked: true,
		name: 'Baseball',
		id: '3444',
	},
	{
		category: 'SportingGoods',
		price: 29.99,
		stocked: false,
		name: 'Basketball',
		id: '1344',
	},
	{
		category: 'Electronics',
		price: 99.99,
		stocked: true,
		name: 'iPodTouch',
		id: '3422',
	},
	{
		category: 'Electronics',
		price: 399.99,
		stocked: false,
		name: 'iPhone5',
		id: '2567',
	},
	{
		category: 'Electronics',
		price: 199.99,
		stocked: true,
		name: 'Nexus7',
		id: '3214',
	},
	{
		category: 'Kitchenware',
		price: 9.99,
		stocked: true,
		name: 'Pot',
		id: '1414',
	},
]

app.get('/products', (req, res) => {
	res.json(Products)
})

app.get('/products/:id', function (req, res) {
	let id = req.params.id
	let product = Products.find((product) => product.id === id)
	if (product) res.json(product)
	else res.status(404).json({ error: `Not found product with id ${id}` })
})

app.post('/products', (req, res) => {
	console.log(req.body)
	if (req.is('json')) {
		let product = req.body
		console.log('Body: ', product)
		Products.push(product)

		// แก้ไขให้คืนค่า product ที่เพิ่มใหม่ เพื่อให้สอดคล้องกับการทํางานของ client
		res.json(product)
	} else {
		res.status(400).end(`Expected JSON product data!\n${req.body}`)
	}
})

//make server start listening on a specified port
app.listen(port, () => {
	console.log(`Server started at port ${port}`)
})
