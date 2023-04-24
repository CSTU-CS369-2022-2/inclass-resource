let data = [
	{
		id: 1,
		email: 'jane@oneMail.com',
		name: 'Jane',
		password: '$2b$10$B3ixQFc4o28LYsbuHjgftO138kI.g92uvmzYwnUt0qWGzpMWimtXu', // Jane123
		roles: { User: 2001, Editor: 1984, Admin: 5150 },
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmVAb25lTWFpbC5jb20iLCJpYXQiOjE2Nzk4NDM5NjcsImV4cCI6MTY3OTg0NTE2N30.mfR10zbLdP-VNf114ym5T4k7vvv5cDEDwzs3IMlB6ZY',
	},
	{
		id: 2,
		email: 'harry@twoMail.com',
		name: 'Harry',
		password: '$2b$10$ljWMwr5zPzh/Ryv4KuUj9uM7SPrX.iIf3WdoTdaSHOPo/C4n4EKU6', // Harry123
		roles: { User: 2001 },
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnJ5QHR3b01haWwuY29tIiwiaWF0IjoxNjc5ODM4NzI3LCJleHAiOjE2Nzk4Mzk5Mjd9.mHHv3HovevdyOAVePOsS5XCvYOWPbNr2IUwI633sykU',
	},
	{
		id: 3,
		email: 'susan@oneMail.com',
		name: 'Susan',
		password: '$2b$10$MwVTUtW92afJ6Cgbf2lTw.k6K76j0bSyzJWRQajD4y2Zx0lzr2l7i', // Susan123
		roles: { User: 2001, Editor: 1984 },
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1c2FuQG9uZU1haWwuY29tIiwiaWF0IjoxNjc5ODM4ODgxLCJleHAiOjE2Nzk4NDAwODF9.ZwfQezARdef5c0QMabx-OZSRXFjagr3FrW8sTYWhfC0',
	},
]

let User = {
	find: () => new Promise((resolve, reject) => resolve(data)),
	findOne: ({ email }) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.email === email)
			if (index < 0) reject({ error: 'Not found user email ja: ' + email })
			else resolve(data[index])
		})
	},
	findName: (name) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.name === name)
			if (index < 0) reject({ error: 'Not found user name: ' + name })
			else resolve(data[index])
		})
	},
	findByRefreshToken: (token) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.refreshToken === token)
			if (index < 0) reject({ error: 'Not found user with token: ' + token })
			else resolve(data[index])
		})
	},
	findAndUpdate: (email, user, updateUser = true) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.email === email)
			if (index < 0)
				if (!updateUser) reject({ error: 'Not found user: ' + email })
				else {
					data.push(user)
					resolve(data[data.length - 1])
				}
			else {
				user = { ...data[index], ...user }
				data.splice(index, 1, user)
				resolve(data[index])
			}
		})
	},
	insert: (user) => {
		return new Promise((resolve, reject) => {
			if (!user.id) {
				const uuid = Math.random().toString(36).substring(2, 9)
				user = { id: uuid, ...user }
			}
			data.push(user)
			resolve(data[data.length - 1])
		})
	},
	delete: (id) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.id === id)
			if (index < 0) return reject('Not found user: ' + id)
			data.splice(index, 1)
			resolve(1)
		})
	},
}

export default User
