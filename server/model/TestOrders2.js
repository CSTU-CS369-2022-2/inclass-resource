import Product from './ProductDB.js'
import Orders from './OrdersDB.js'
import mongooseDbConnect from '../config/dbConnect.js'

mongooseDbConnect()

const insertAnOrder = async () => {
	try {
		const products = await Product.find({
			id: { $in: ['1344', '3422'] },
		}).exec()
		
		if (products && products?.length > 0) {
			var anOrder = new Orders({
				orderNo: now.toString(),
				orderedBy: {
					name: 'John Smith',
				},
				orderedItems: [
					{ qty: 2, unitPrice: products[0].price, productRef: products[0]._id },
					{ qty: 1, unitPrice: products[1].price, productRef: products[1]._id },
				],
			})

			const result = await anOrder.save()
			if (result) {
				const orders = await Orders.find({}) // search without condition
					.populate('orderedItems.productRef')
					.exec()
				if (orders) {
					console.log(JSON.stringify(orders, null, '\t'))
					console.log('done!!')
					process.kill(process.pid, 'SIGINT')
				}
			}
		} else {
			console.log('Not found products!')
			process.kill(process.pid, 'SIGINT')
		}
	} catch (err) {
		throw err
	}
}

insertAnOrder()
