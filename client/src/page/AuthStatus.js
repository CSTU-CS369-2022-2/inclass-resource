import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'

export default function AuthStatus() {
	let auth = useAuth()
	let navigate = useNavigate()

	if (!auth.user?.email) {
		return (
			<p>
				You are not login. Would you like to <Link to="/login">logged in</Link>?
			</p>
		)
	}

	return (
		<div>
			Welcome {auth.user?.email}!{' '}
			<div>
				Go to your <Link to="/secret">Secret</Link> or
				<button
					onClick={() => {
						auth.signout(() => navigate('/'))
					}}
				>
					Sign out
				</button>
			</div>
		</div>
	)
}
