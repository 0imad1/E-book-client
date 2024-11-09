import React, { useState } from "react";
import { addBook } from "../utils/ApiFunctions"; // Assuming this is your import statement
import BookTypeSelector from "../Common/BookTypeSelector";
import { Link, useParams } from "react-router-dom"


const AddBook = () => {
    const [newBook, setNewBook] = useState({
        image: null,
        bookSize: "",
        bookType: "",
        bookDescription:"",
        bookName:"",
        bookLink:"",
        bookKeywords:""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleBookInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "bookSize") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewBook({ ...newBook, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewBook({ ...newBook, image: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addBook(newBook.image, newBook.bookSize, newBook.bookType,
                                          newBook.bookDescription, newBook.bookName,newBook.bookLink,newBook.bookKeywords);
            if (success !== undefined) {
                setSuccessMessage("A new book was added successfully!");
                setNewBook({ image: null, bookSize: "", bookType: "",bookDescription:"",bookName:"",bookLink:"",bookKeywords:"" });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new book");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Book</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="bookType" className="form-label">
                                    Book Type
                                </label>
                                <div>
                                    <BookTypeSelector
                                        handleBookInputChange={handleBookInputChange}
                                        newBook={newBook}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bookSize" className="form-label">
                                    Book Size
                                </label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    id="bookSize"
                                    name="bookSize"
                                    value={newBook.bookSize}
                                    onChange={handleBookInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Book Photo
                                </label>
                                <input
                                    required
                                    name="image"
                                    id="image"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview book photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bookName" className="form-label">
                                    Book Name
                                </label>
                                <input
                                    required
                                    type="name"
                                    className="form-control"
                                    id="bookName"
                                    name="bookName"
                                    value={newBook.bookName}
                                    onChange={handleBookInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bookDescription" className="form-label">
                                    Book Description
                                </label>
                                <input
                                    required
                                    type="name"
                                    className="form-control"
                                    id="bookDescription"
                                    name="bookDescription"
                                    value={newBook.bookDescription}
                                    onChange={handleBookInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bookLink" className="form-label">
                                    Book Link
                                </label>
                                <input
                                    required
                                    type="name"
                                    className="form-control"
                                    id="bookLink"
                                    name="bookLink"
                                    value={newBook.bookLink}
                                    onChange={handleBookInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bookKeywords" className="form-label">
                                    Book keywords
                                </label>
                                <input
                                    required
                                    type="name"
                                    className="form-control"
                                    id="bookKeywords"
                                    name="bookKeywords"
                                    value={newBook.bookKeywords}
                                    onChange={handleBookInputChange}
                                />
                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-books"} className="btn btn-outline-info ml-5">
                                    back
                                </Link>
								
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save book
								</button>
							</div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddBook;
