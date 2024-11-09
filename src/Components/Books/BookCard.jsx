import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const BookCard = ({ book }) => {
	return (
		<Col key={book.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/download-book/${book.id}`}>
							<Card.Img
								variant="top"
								src={`data:image/png;base64, ${book.image}`}
								alt="book Photo"
								style={{ width: "60%", maxWidth: "200px", height: "auto" }}
							/>
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="hotel-color">Book Name:{book.bookName}/{book.bookType}</Card.Title>
                        <Card.Title className="book-size">Number Of Pages:{book.bookSize}</Card.Title>

						<Card.Text>Some book information goes here for the guest to read through</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/download-book/${book.id}`} className="button">
							Download Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default BookCard