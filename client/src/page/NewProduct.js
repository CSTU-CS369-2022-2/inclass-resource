import { Form, redirect, useNavigate } from 'react-router-dom'
// import { createProduct } from '../newProductsData'

async function createProduct(newProduct) {
	try {
		let response = await fetch('/products', {
			method: 'POST',
			body: JSON.stringify(newProduct),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			if (!res.ok) {
				throw Error({ error: `Could not add new product ${newProduct.name}` })
			}
			return res.json()
		})
		return response
	} catch (error) {
		console.error('Error:', error)
	}
}

export async function newAction({ request, params }) {
	const formData = await request.formData()
	// get data out for validation, if needed. For example,
	// const name = formData.get("name");
	// const category = formData.get("category");
	let product = Object.fromEntries(formData)
	if (!product) {
		throw new Error('Error in inserting new product ')
	}
	product = { id: params.id, ...product }
	const { id } = await createProduct(product)
	return redirect(`/products/${id}`)
}

export default function NewProduct() {
	const navigate = useNavigate()
	return (
		<Form replace method="post" className="product-form">
			<label>
				<span>Name*</span>
				<input placeholder="Name" type="text" name="name" required />
			</label>
			<label>
				<span>Category*</span>
				<input placeholder="Category" type="text" name="category" required />
			</label>
			<label>
				<span>Price*</span>
				<input
					type="number"
					name="price"
					placeholder="Price"
					required
					step={0.01}
				/>
			</label>
			<label>
				<span>In stock*:</span>
				<span>
					<input type="radio" name="stocked" value={true} defaultChecked />
					available
				</span>
				<span>
					<input type="radio" name="stocked" value={false} /> out of stock
				</span>
			</label>
			<label>
				<span>Detail</span> <textarea name="detail" rows={6} />
			</label>
			<p>
				<button type="submit">Save </button>
				<button
					type="button"
					onClick={() => {
						navigate(-1)
					}}
				>
					Cancel
				</button>
			</p>
		</Form>
	)
}
