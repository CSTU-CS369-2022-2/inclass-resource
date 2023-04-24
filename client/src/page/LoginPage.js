import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'

import './LoginPage.css'

const LoginPage = () => {
	const auth = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	let from = location.state?.from?.pathname || '/'

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		// // can use formData also
		// const formData = e.formData();
		// let loginData = Object.fromEntries(formData);
		try {
			const response = await fetch('/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }), // type match "Content-Type" header
			})
			if (response.ok) {
				const data = await response.json()

				const accessToken = data?.accessToken
				const roles = data?.roles
				setEmail('')
				setPassword('')

				const user = { email, roles, accessToken }
				auth.signin(user, () => navigate(from, { replace: true }))
			} else {
				console.log('login error')
				throw new Error('Login Error')
			}
		} catch (error) {
			throw new Error('Error. Try again later!')
		}
	}

	return (
		<>
			<div>
				<form className="login-form" onSubmit={handleSubmit}>
					<h1>Login</h1>
					<div className="form-input">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							placeholder="youremail@site.com"
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-input">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							placeholder="password"
							autoComplete="off"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
			<div>
				or <Link to="/signup">Signup</Link> if you need an accout.
			</div>
		</>
	)
}

export default LoginPage
