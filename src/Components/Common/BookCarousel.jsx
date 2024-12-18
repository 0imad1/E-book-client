import React, { useEffect, useState } from "react";
import { getAllBooks } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const BookCarousel = () => {
    const [books, setBooks] = useState([{ id: "", bookType: "", bookSize: "", bookName: "", image: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [clickCounts, setClickCounts] = useState({});

    useEffect(() => {
        setIsLoading(true);
        getAllBooks()
            .then((data) => {
                setBooks(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    const handleDownloadClick = (bookId) => {
        setClickCounts(prevCounts => {
            const newCounts = { ...prevCounts };
            newCounts[bookId] = (newCounts[bookId] || 0) + 1;

            if (newCounts[bookId] <= 3) {
                window.open("https://www.profitablecpmrate.com/ikexr802?key=5ee1b3e4b43a0a7eaf65cc5047e256ff", "_blank");
            } else {
                window.location.href = `/download-book/${bookId}`;
            }

            return newCounts;
        });
    };

    if (isLoading) {
        return <div className="mt-5">Loading Books....</div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(books.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {books.slice(index * 4, index * 4 + 4).map((book) => (
                                    <Col key={book.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card className="carousel-card">
                                            <Link to={`/download-book/${book.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${book.image}`}
                                                    alt="Book Photo"
                                                    className="carousel-image"
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="carousel-book-name">{book.bookName}</Card.Title>
                                                <Card.Text className="carousel-book-type">{book.bookType}</Card.Text>
                                                <Card.Text className="carousel-book-size">{book.bookSize} Pages</Card.Text>
                                                <div className="flex-shrink-0">
                                                    <button onClick={() => handleDownloadClick(book.id)} className="carousel-button">
                                                        Download Now
                                                    </button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default BookCarousel;
