import { createContext, useState, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({})
	let signin = (newUser, callback) => {
		setUser(newUser)
		console.log('sign in', newUser)
		callback()
	}

	let signout = (callback) => {
		setUser({})
		callback()
	}

	return (
		<AuthContext.Provider value={{ user, signin, signout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
