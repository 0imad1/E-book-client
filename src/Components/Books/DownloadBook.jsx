import React from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../utils/ApiFunctions";
import BookCarousel from "../Common/BookCarousel";
import { Helmet } from "react-helmet";
import AdBanner from "../Common/AdBanner";
import Banner from "../Common/Banner";
import AdComponent from "../Common/AdComponent";

const DownloadBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);

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

    const handleDownloadClick = () => {
        setClickCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount <= 3) {
                window.open("https://www.profitablecpmrate.com/ikexr802?key=5ee1b3e4b43a0a7eaf65cc5047e256ff", "_blank");
            } else {
                window.location.href = book.bookLink;
            }
            return newCount;
        });
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title> Download : {book.bookName}</title>
                <meta name="description" content={book.bookDescription} />
                <link rel="canonical" href={`/download-book/${bookId}`} />
                <meta name="keywords" content={book.bookKeywords} />
                <script type='text/javascript' src='//pl24963153.profitablecpmrate.com/55/d4/17/55d417ba01c3415c76081909781cc74a.js'></script>
            </Helmet>

            <section className="bg-light p-2 mb-5 mt-5 shadow">
                <AdBanner/>
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
                            <button onClick={handleDownloadClick} className="button">
                                Click to Download your Book
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="separator" />
                <AdComponent/>
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
