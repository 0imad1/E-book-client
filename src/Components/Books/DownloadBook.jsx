import React from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../utils/ApiFunctions";
import BookCarousel from "../Common/BookCarousel";
import { Helmet } from "react-helmet";

const DownloadBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = React.useState(null);

    React.useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await getBookById(bookId);
                setBook(bookData);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };

        fetchBook();
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title> Download : {book.bookName}</title>
                <meta name="description" content={book.bookDescription} />
                <link rel="canonical" href={`/download-book/${bookId}`} />
				<meta name="keywords" content={book.bookKeywords}/>
            </Helmet>
            
            <section className="bg-light p-2 mb-5 mt-5 shadow">
                <div className="book-details-container">
                    <div className="book-image-container">
                        <img 
                            src={`data:image/png;base64, ${book.image}`} 
                            alt="Book Photo"
                            style={{ width: "130%", maxWidth: "350px", height: "auto" }}
                        />
                    </div>

                    <div className="book-info-container">
                        <h1 className="book-title">{book.bookName}</h1>
                        <p><strong>Book Type:</strong> {book.bookType}</p>
                        <p><strong>Number Of Pages:</strong> {book.bookSize} Pages</p>
                        <p><strong>Book Description:</strong> {book.bookDescription}</p>

                        <div className="button-container">
                            <a href={book.bookLink} className="button" target="_blank" rel="noopener noreferrer">
                                Click to Download your Book
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="separator" />
                
                <div className="carousel-title">
                    <h3>Similar Books</h3>
                </div>
                <BookCarousel />
            </section>
        </>
    );
};

export default DownloadBook;
