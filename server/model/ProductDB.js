import * as mongooseDef from 'mongoose'
let mongoose = mongooseDef.default

var productSchema = mongoose.Schema({
	category: String,
	id: { type: String, unique: true, required: true },
	name: String,
	price: Number,
	stocked: Boolean,
	detail: String,
})

// compile the schema into a model, or a class that we can do things on.
let Product = mongoose.model('Product', productSchema, 'products')

export default Product
