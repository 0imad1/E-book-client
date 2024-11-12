import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const [clickCount, setClickCount] = useState(0);

    const handleDownloadClick = () => {
        setClickCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount <= 3) {
                window.open("https://www.profitablecpmrate.com/ikexr802?key=5ee1b3e4b43a0a7eaf65cc5047e256ff", "_blank");
            } else {
                window.location.href = `/download-book/${book.id}`;
            }
            return newCount;
        });
    };

    return (
        <Col key={book.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
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
                        <Card.Title className="hotel-color">Book Name: {book.bookName} / {book.bookType}</Card.Title>
                        <Card.Title className="book-size">Number Of Pages: {book.bookSize}</Card.Title>
                        <Card.Text>Some book information goes here for the guest to read through</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <button onClick={handleDownloadClick} className="button">
                            Download Now
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BookCard;
