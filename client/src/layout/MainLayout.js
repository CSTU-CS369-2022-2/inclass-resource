import { NavLink, Outlet } from 'react-router-dom'
import LoginMenu from '../component/LoginMenu'
import { AuthProvider } from '../utils/AuthProvider'

const MainLayout = () => {
	return (
		<AuthProvider>
			<div className="container">
				<nav>
					<NavLink to="/">Home</NavLink>&nbsp;
					<NavLink to="/products">Product</NavLink>&nbsp;
					<NavLink to="/about">About us</NavLink>&nbsp;
					<LoginMenu />
				</nav>
				<div className="container">
					<Outlet /> {/* your content will be shown in the Outlet */}
				</div>
				<footer>---------This is a footer--------</footer>
			</div>
		</AuthProvider>
	)
}

export default MainLayout
