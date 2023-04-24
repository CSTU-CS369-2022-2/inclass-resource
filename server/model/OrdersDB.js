import * as mongooseDef from 'mongoose'
let mongoose = mongooseDef.default

const ordersSchema = new mongoose.Schema({
	orderNo: String,
	orderedDate: { type: String, default: new Date(Date.now()).toLocaleString() },
	orderedBy: {
		name: { type: String, default: 'Guest' },
	},
	orderedItems: [
		{
			qty: Number,
			unitPrice: Number,
			productRef: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
			subtotal: Number,
		},
	],
	total: Number,
})

let Orders = mongoose.model('Orders', ordersSchema, 'Orders')

export default Orders
