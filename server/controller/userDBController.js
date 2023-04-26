import User from '../model/UserDB.js'
import bcrypt from 'bcrypt'

export const list = async (req, res) => {
	const result = await User.find()
		.sort({ name: 1 })
		.select(['_id', 'name', 'email', 'roles'])
		.exec()
	return res.json(result)
}

// add new user
export const create = async (req, res) => {
	const { email, name, password } = req.body
	if (!email || !name || !password)
		return res
			.status(400)
			.json({ message: 'Email, name and password are required.' })

	// check for duplicate email in the db
	try {
		const duplicate = await User.findOne({ email: email })
		if (duplicate) return res.sendStatus(409) //Conflict
	} catch (error) {
		console.log('New user: ' + JSON.stringify(error))
	}

	try {
		//encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10)
		//create and store the new user
		const result = await User.create({ ...req.body, password: hashedPwd })
		console.log(result)
		res.status(201).json({ success: `New user ${name} created!` })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
// Find a single user with email
export const get = (req, res) => {
	const email = req.params.email
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					error: 'User not found with email ' + email,
				})
			}
			res.json(user) // default status = 200
		})
		.catch((err) => {
			return res.status(500).send({
				error: 'Error retrieving user with email ' + email,
			})
		})
}

// Update a user identified by the email in the request
export const put = async (req, res) => {
	// Validate Request
	const data = req.body || {}

	if (!data || !req.params.email)
		return res.status(422).send({ error: 'email must be alphanumeric.' })

	// if update password, hash the password before save
	if (req.body.password) {
		const hashedPwd = await bcrypt.hash(req.body.password, 10)
		req.body.password = hashedPwd
	}

	// Find User and update it with the request body
	try {
		const foundUser = await User.findOneAndUpdate(
			{ email: req.params.email },
			req.body,
			{
				upsert: false,
				returnOriginal: false,
			}
		)
		if (!foundUser) {
			return res.status(404).send({
				error: 'User not found with email ' + req.params.email,
			})
		}
		return res.json(foundUser)
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				error: 'User not found with email ' + req.params.email,
			})
		}
		return res.status(500).send({
			error: 'Error updating User with email ' + req.params.email,
		})
	}
}
