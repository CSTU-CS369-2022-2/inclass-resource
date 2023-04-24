import Product from './ProductDB.js'
import mongooseDbConnect from '../config/dbConnect.js'

mongooseDbConnect()

var products = [
	{
		category: 'Sporting Goods',
		price: 1500,
		stocked: true,
		name: 'Football',
		id: '1234',
	},
	{
		category: 'Sporting Goods',
		price: 300,
		stocked: true,
		name: 'Baseball',
		id: '3444',
	},
	{
		category: 'Sporting Goods',
		price: 900,
		stocked: false,
		name: 'Basketball',
		id: '1344',
	},
	{
		category: 'Electronics',
		price: 3300,
		stocked: true,
		name: 'iPod Touch',
		id: '3422',
	},
	{
		category: 'Electronics',
		price: 12000,
		stocked: false,
		name: 'iPhone 5',
		id: '2567',
	},
	{
		category: 'Electronics',
		price: 6000,
		stocked: true,
		name: 'Nexus 7',
		id: '3214',
	},
]

//console.log(JSON.stringify(products));
Product.insertMany(products)
	.then(function (docs) {
		console.log('Successfully insert to DB')
		docs.forEach((e) => console.log(JSON.stringify(e, null, '\t')))
		console.log('done!!')
		process.kill(process.pid, 'SIGINT')
	})
	.catch(function (err) {
		console.log(err)
	})
