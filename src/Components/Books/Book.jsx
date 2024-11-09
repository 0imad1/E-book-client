import React, { useEffect, useState } from "react"
import { getAllBooks } from "../utils/ApiFunctions"
import BookCard from "./BookCard"
import { Col, Container, Row } from "react-bootstrap"
import BookFilter from "../Common/BookFilter"
import BookPaginator from "../Common/BookPaginator"

const Book = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [bookPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getAllBooks()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading Books.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(filteredData.length / bookPerPage)

	const renderBooks = () => {
		const startIndex = (currentPage - 1) * bookPerPage
		const endIndex = startIndex + bookPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((book) => <BookCard key={book.id} book={book} />)
	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<BookFilter data={data} setFilteredData={setFilteredData} />
				</Col>
             

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<BookPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderBooks()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<BookPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default Book