import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Welcome to Admin Panel</h2>
			<hr />
			<Link to={"/existing-books"}>Manage Books</Link> <br />
			<Link to={"/upload-book"}>Upload Books</Link> <br />

		</section>
	)
}

export default Admin