import * as mongooseDef from 'mongoose'
import { validatorEmail } from '../util/util.js'

let mongoose = mongooseDef.default
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		validate: {
			validator: validatorEmail,
			message: (props) => `${props.value} is not a valid email!`,
		},
		unique: [true, 'Must be uniqued'],
		required: [true, 'email is required'],
	},
	password: {
		type: String,
		required: true,
		minLength: [40], // bcrypt hash binary size is 40+
	},
	roles: {
		User: { type: Number, default: 2001 },
		Editor: { type: Number, default: 1984 },
		Admin: { type: Number, default: 5150 },
	},
	refreshToken: { type: String },
	bio: { type: String, required: false },
})

// *** Important note ***
// methods in schema must be defined in a function format
// not in big arrow form in order to get a correct "this" property
userSchema.methods.toProfileJSON = function () {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		roles: this.roles,
	}
}

userSchema.statics.findByRefreshToken = async function (refreshToken) {
	return await this.findOne({ refreshToken })
}

let User = mongoose.model('User', userSchema, 'users')

export default User
