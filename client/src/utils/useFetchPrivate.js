import { useState } from 'react'
import { useAuth } from './AuthProvider'

let useFetchPrivate = () => {
	const { user, setUser } = useAuth()
	const [loading, setLoading] = useState(true)

	// const baseURL = 'http://127.0.0.1:4000'
	const setAuthorizationHeader = (params, accessToken) => {
		if (!params) {
			params = {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		} else {
			if (!params.headers || !params.headers['Authorization']) {
				Object.assign(params, {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
			}
			Object.assign(params, {
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
			})
		}
		return params
	}

	const originalRequest = async (url, config) => {
		config = setAuthorizationHeader(config, user.accessToken)
		let response = await fetch(url, config)
		return response
	}

	const refreshToken = async (acsessToken) => {
		let response = await fetch('/auth/refresh', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		let data = await response.json()
		if (response.ok) {
			setUser((prev) => {
				return { ...prev, accessToken: data.accessToken }
			})
			return data.accessToken
		} else throw new Error('Cannot Refresh Token')
	}

	const callFetch = async (url, config) => {
		try {
			let response = await originalRequest(url, config)
			if (response.ok) {
				let data = await response.json()
				return { response, data }
			} else {
				if (response?.status === 403) {
					// token expire or loss?
					const newAccessToken = await refreshToken()
					const options = setAuthorizationHeader(
						config,
						`Bearer ${newAccessToken}`
					)
					let response = await originalRequest(url, options)
					let data = {}
					if (response.ok) {
						data = await response.json()
					}
					return { response, data }
				}
			}
		} catch (error) {
			throw error
		} finally {
			setLoading(false)
		}
	}

	return { loading, callFetch, refreshToken }
}

export default useFetchPrivate
