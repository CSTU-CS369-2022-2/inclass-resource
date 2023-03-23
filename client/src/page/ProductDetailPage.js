import { useLoaderData } from 'react-router-dom'
import BreadCrumbs from '../component/BreadCrumbs'
// import { getProduct } from '../productsData'

const ProductDetailPage = () => {
	const product = useLoaderData()
	return (
		<>
			<BreadCrumbs />
			<div className="item">
				{product ? (
					<>
						<h2>{product.name}</h2>
						<div>
							<span>Id:</span> {product.id}
						</div>
						<div>
							<span>Category:</span> {product.category}
						</div>
						<div>
							<span>Price:</span> {product.price}
						</div>
						{product.stocked ? (
							<div className="info">Available</div>
						) : (
							<div className="danger">Out of stock</div>
						)}
						<div>
							<span>Detail:</span>
							{product.detail}
						</div>
					</>
				) : (
					<div>No such product!</div>
				)}
			</div>
		</>
	)
}
export default ProductDetailPage

// export async function loader({ params }) {
//   const res = await getProduct(params.id);
//   return res;
// }

export const loader = async ({ params }) => {
	const { id } = params
	const res = await fetch('/products/' + id)
	let product = await res.json()
	if (!res.ok) {
		throw Error(product.error)
	}
	return product //res.json()
}
