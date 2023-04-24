import { NavLink, redirect } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'

export default function LoginMenu() {
	const auth = useAuth()

	return (
		<>
			{auth?.user?.email ? (
				<div className="user-menu">
					<ul>
						<li>
							<NavLink to="/secret">Secret</NavLink>
						</li>
						<li
							className="as-link"
							onClick={() => {
								auth.signout(() => redirect('/'))
							}}
						>
							Sign out
						</li>
					</ul>
					<div>{auth.user.email}</div>
				</div>
			) : (
				<NavLink to="/login">Login</NavLink>
			)}
		</>
	)
}
