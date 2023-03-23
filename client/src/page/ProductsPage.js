import {
	Link,
	Form,
	useLoaderData,
	useSearchParams,
	useSubmit,
	redirect,
} from 'react-router-dom'
// import { getProducts } from '../productsData'

const ProductsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const q = searchParams.get('q')
	console.log(q)
	const submit = useSubmit()

	const resetSearch = (e) => {
		// we still want the reset form behavior, so do NOT prevent default
		//    e.preventDefault();

		// need to clear the searchParams on the URL
		const param = searchParams.get('q')
		if (param) {
			searchParams.delete('q')
			setSearchParams(searchParams)
		}
	}

	const products = useLoaderData()
	const list = products.map((e) => (
		<Link key={e.id} to={e.id}>
			<li title={e.category}>{e.name}</li>
		</Link>
	))

	return (
		<>
			<Form id="search-form" role="search">
				<fieldset>
					<legend>Search</legend>
					<input
						id="q"
						placeholder="Search"
						type="search"
						name="q"
						defaultValue={q}
						onChange={(event) => {
							console.log('target form', event.currentTarget.form)
							submit(event.currentTarget.form)
						}}
					/>
					<input type="reset" onClick={resetSearch} />
				</fieldset>
			</Form>
			<hr />
			<Form method="post">
				<button type="submit">Add new product</button>
			</Form>

			{products.length ? (
				<ul className="list-item">{list}</ul>
			) : (
				'No product available'
			)}
		</>
	)
}

export default ProductsPage

// export const productsLoader = async () => {
//   const res = await getProducts();
//   return res;
// };

// export async function productsLoader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");

//   const products = await getProducts(q);
//   return products;
// }

export const productsLoader = async () => {
	// const res = await getProducts();
	const res = await fetch('/products')
	if (!res.ok) {
		throw Error('Could not fetch the products')
	}
	return res.json()
}

const genId = () => Math.random().toString(36).substring(2, 9)

export async function action() {
	const productId = genId()
	return redirect(`/products/${productId}/new`)
}
