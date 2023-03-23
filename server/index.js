import express from 'express'

const app = express()
const port = 4000

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
	res.send('id is set to ' + req.params.id)
})

app.get('/products/:id', function (req, res) {
	let id = req.params.id
	let product = Products.find((product) => product.id === id)
	if (product) res.json(product)
	else res.status(404).json({ error: `Not found product with id ${id}` })
})

//make server start listening on a specified port
app.listen(port, () => {
	console.log(`Server started at port ${port}`)
})
