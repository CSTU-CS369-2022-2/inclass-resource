import User from '../model/UserDB.js'
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
			expiresIn: process.env.ACCESS_TOKEN_TIME ?? '1200s', // 20min
		}
	)
}

const handleLogin = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({ message: 'email and password are required.' })

	let foundUser = await User.findOne({ email })
	if (!foundUser) {
		return res.status(404).send({
			error: 'User not found with email ' + email,
		})
	}

	// evaluate password
	const match = await bcrypt.compare(password, foundUser?.password)
	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean) // short form of .filter(item => Boolean(item))
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
		//const result = await User.findAndUpdate(foundUser.email, foundUser, true);
		foundUser = await User.findOneAndUpdate(
			{ email },
			{ refreshToken },
			{
				upsert: false, // Make this update into an upsert
			}
		)

		// Creates Secure Cookie with refresh token
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			path: '/',
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
		if (!foundUser) throw 'Not found this refresh token' + refreshToken
	} catch (error) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			path: '/',
			maxAge: 0,
		})
		return res.sendStatus(204)
	}

	// Delete refreshToken in db
	const result = await User.findOneAndUpdate(
		{ email: foundUser.email },
		{ refreshToken: '' },
		{
			upsert: false, // Make this update into an upsert
		}
	)

	// const result = await User.findAndUpdate(foundUser.email, foundUser, true);
	console.log('Logout: ', result)
	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'None',
		secure: true,
		path: '/',
		maxAge: 0,
	})

	res.sendStatus(204)
}

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(401)

	const refreshToken = cookies.jwt
	try {
		const foundUser = await User.findByRefreshToken(refreshToken)
		if (foundUser) {
			// evaluate jwt
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				(err, decoded) => {
					if (err || foundUser.email !== decoded.email)
						return res.sendStatus(403)
					const roles = Object.values(foundUser.roles)
					const accessToken = signToken(decoded.email, foundUser.name, roles)
					res.json({ roles, accessToken })
				}
			)
		} else return res.status(403).send(error) //"Error Unauthorized"
	} catch (error) {
		return res.status(403).send(error) //"Error Unauthorized"
	} //Forbidden
}

export { handleLogin, handleLogout, handleRefreshToken }
