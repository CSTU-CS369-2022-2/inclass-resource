// file: util/util.js
// check for blank string: true if it is, false if it is not
export let isBlank = (str) => !str || /^\s*$/.test(str)

// validataion for email
export const validatorEmail = (value) => {
	let validEmail =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
	return validEmail.test(value)
}
