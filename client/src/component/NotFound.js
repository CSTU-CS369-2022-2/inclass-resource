import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div>
			<h2>Page not found!</h2>
			<p>Sorry this page could not be found!</p>
			<p>
				Go to the <Link to="/">Homepage</Link>
			</p>
		</div>
	)
}
