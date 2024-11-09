import React from "react"
import Book from "./Book"
import { Helmet } from "react-helmet"

const BookListing = () => {
	return (
		<><Helmet>
			<title>Book Listing</title>
			<meta name="description" content="Explore our eBook library for user manuals, guides, and educational eBooks.
			 Download PDF and ePub formats of affordable digital books today!" />
			<link rel="canonical" href="/browse-all-books"/> 
		</Helmet>
		<section className="bg-light p-2 mb-5 mt-5 shadow">
			<Book/>
		</section></>
	)
}

export default BookListing