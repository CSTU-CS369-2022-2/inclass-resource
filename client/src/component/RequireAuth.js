import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../utils/AuthProvider'

const RequireAuth = () => {
	const auth = useAuth()
	const location = useLocation()
	console.log('*********require auth', auth.user)
	
	if (!auth.user?.email)
		return <Navigate to="/login" state={{ from: location }} replace />
	
		return <Outlet />
}

export default RequireAuth
