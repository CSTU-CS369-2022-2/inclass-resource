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

		const refreshToken = jwt.sign(
			{ email: foundUser.email },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: process.env.REFRESH_TOKEN_TIME ?? '1d',
			}
		)

		// Saving refreshToken with current user
		foundUser.refreshToken = refreshToken
		// const result = await foundUser.save();
		const result = await User.findAndUpdate(foundUser.email, foundUser, true)

		// Creates Secure Cookie with refresh token
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 24 * 60 * 60 * 1000, // should equal to the server's refresh token time
		})

		// Send authorization roles and access token to user
		res.json({ roles, accessToken })
	} else {
		res.sendStatus(401)
	}
}

const handleLogout = async (req, res) => {
	// On client, also delete the accessToken

	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(204) //No content

	const refreshToken = cookies.jwt

	// Is refreshToken in db?
	let foundUser = {}
	try {
		foundUser = await User.findByRefreshToken(refreshToken)
	} catch (error) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
		return res.sendStatus(204)
	}

	// Delete refreshToken in db
	foundUser.refreshToken = ''

	// const result = await foundUser.save();
	const result = await User.findAndUpdate(foundUser.email, foundUser, true)
	console.log('Logout: ', result)
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

	res.sendStatus(204)
}

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)

	const refreshToken = cookies.jwt
	try {
		const foundUser = await User.findByRefreshToken(refreshToken)

		// evaluate jwt
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || foundUser.email !== decoded.email) return res.sendStatus(403)
				const roles = Object.values(foundUser.roles)
				const accessToken = signToken(decoded.email, foundUser.name, roles)
				res.json({ roles, accessToken })
			}
		)
	} catch (error) {
		return res.status(403).send(error) //"Error Unauthorized"
	} //Forbidden
}

export { handleLogin, handleLogout, handleRefreshToken }
