import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const signToken = (email, name, roles) => {
	return jwt.sign(
		{
			UserInfo: {
				email: email,
				name: name,
				roles: roles,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_TIME
				? process.env.ACCESS_TOKEN_TIME
				: '1200s', // 20min
		}
	)
}

const handleLogin = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({ message: 'email and password are required.' })
	let foundUser = {}
	try {
		foundUser = await User.findOne({ email: email })
	} catch (error) {
		console.log(JSON.stringify(error))
		return res.status(401).json(error)
	} //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(password, foundUser.password)
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean)
		// short form of .filter(item => Boolean(item))
		// create JWTs
		const accessToken = signToken(
			foundUser.email,
			foundUser.name,
			foundUser.roles
		)
		// Send authorization roles and access token to user
		res.json({ roles, accessToken })
	} else {
		res.sendStatus(401)
	}
}

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken
	console.log('Logout: ')
	res.sendStatus(204)
}

export { handleLogin, handleLogout }
