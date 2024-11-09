import React, { useEffect, useState } from "react"
import { deleteBook, getAllBooks } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import BookFilter from "../Common/BookFilter"
import BookPaginator from "../Common/BookPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingBooks = () => {
	const [books, setBooks] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [booksPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
	const [filteredBooks, setFilteredBooks] = useState([])
	const [selectedBookType, setSelectedBookType] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	useEffect(() => {
		fetchBooks()
	}, [])

	const fetchBooks = async () => {
		setIsLoading(true)
		try {
			const result = await getAllBooks()
			setBooks(result)
			setFilteredBooks(result)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (selectedBookType === "") {
			setFilteredBooks(books)
		} else {
			const filteredBooks = books.filter((book) => book.bookType === selectedBookType)
			setFilteredBooks(filteredBooks)
		}
		setCurrentPage(1)
	}, [books, selectedBookType])

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const handleDelete = async (bookId) => {
		try {
			await deleteBook(bookId)
			setSuccessMessage(`Book No ${bookId} was deleted`)
			fetchBooks()
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	const calculateTotalPages = (books, booksPerPage) => {
		return Math.ceil(books.length / booksPerPage)
	}

	const indexOfLastBook = currentPage * booksPerPage
	const indexOfFirstBook = indexOfLastBook - booksPerPage
	const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

	return (
		<>
			<div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>

			{isLoading ? (
				<p>Loading existing books...</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<div className="d-flex justify-content-between mb-3 mt-5">
							<h2>Existing books</h2>
						</div>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<BookFilter data={books} setFilteredData={setFilteredBooks} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-book"}>
									<FaPlus /> Add book
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Book Type</th>
									<th>Book Size</th>
									<th>Book Name</th>
									<th>Book Description</th>
                                    <th>Book Link</th>
									<th>Book Keywords</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{currentBooks.map((book) => (
									<tr key={book.id} className="text-center">
										<td>{book.id}</td>
										<td>{book.bookType}</td>
										<td>{book.bookSize}</td>
										<td>{book.bookName}</td>
										<td>{book.bookDescription}</td>
                                        <td>{book.bookLink}</td>
										<td>{book.bookKeywords}</td>

										<td className="gap-2">
											<Link to={`/edit-book/${book.id}`} className="gap-2">
												<span className="btn btn-info btn-sm">
													<FaEye />
												</span>
												<span className="btn btn-warning btn-sm ml-5">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(book.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<BookPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredBooks, booksPerPage)}
							onPageChange={handlePaginationClick}
						/>
					</section>
				</>
			)}
		</>
	)
}

export default ExistingBooks
