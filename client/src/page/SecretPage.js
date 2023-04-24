import { useEffect, useState } from 'react'

//import { useAuth } from "../utils/AuthProvider";
import useFetchPrivate from '../utils/useFetchPrivate'

import Spinner from '../component/Spinner'

export default function SecretPage() {
	// const auth = useAuth()
	const [secretData, setData] = useState()

	const { loading, callFetch } = useFetchPrivate()

	useEffect(() => {
		const getSecretData = async () => {
			const { response, data } = await callFetch('/secret')
			if (response.ok) {
				setData(JSON.stringify(data))
			}
		}
		try {
			getSecretData()
		} catch (error) {
			console.error(error)
			throw error
		}
	}, [callFetch])

	return (
		<>
			<h1>Very Secret Page!</h1>
			{loading ? <Spinner /> : <div>Content from the server: {secretData}</div>}
		</>
	)
}
