import { Outlet, useNavigation } from 'react-router-dom'
import Spinner from '../component/Spinner'

const ProductLayout = () => {
	const navigation = useNavigation()
	return (
		<>
			<h1> Products</h1>
			<div>
				{navigation.state === 'loading' ? <Spinner /> : ''} <Outlet />
			</div>
		</>
	)
}

export default ProductLayout;
