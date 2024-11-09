import React, { useEffect, useState } from "react"
import { getBookById, updateBook } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditBook = () => {
	const [book, setBook] = useState({
		image: "",
        bookSize: "",
        bookType: "",
        bookDescription:"",
        bookName:"",
        bookLink:"",
		bookKeywords:""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { bookId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setBook({ ...book, image: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setBook({ ...book, [name]: value })
	}

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const bookData = await getBookById(bookId)
				setBook(bookData)
				setImagePreview(bookData.image)
			} catch (error) {
				console.error(error)
			}
		}

		fetchBook()
	}, [bookId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateBook(bookId, book)
			if (response.status === 200) {
				setSuccessMessage("Book updated successfully!")
				const updatedBookData = await getBookById(bookId)
				setBook(updatedBookData)
				setImagePreview(updatedBookData.image)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating book")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<div className="container mt-5 mb-5">
			<h3 className="text-center mb-5 mt-5">Edit book</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="bookType" className="form-label hotel-color">
								Book Type
							</label>
							<input
								type="text"
								className="form-control"
								id="bookType"
								name="bookType"
								value={book.bookType}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="bookSize" className="form-label hotel-color">
								Book Size
							</label>
							<input
								type="number"
								className="form-control"
								id="bookSize"
								name="bookSize"
								value={book.bookSize}
								onChange={handleInputChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="image" className="form-label hotel-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="image"
								name="image"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Book preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
                        <div className="mb-3">
							<label htmlFor="bookName" className="form-label hotel-color">
								Book Name
							</label>
							<input
								type="text"
								className="form-control"
								id="bookName"
								name="bookName"
								value={book.bookName}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="bookDescription" className="form-label hotel-color">
								Book Description
							</label>
							<input
								type="text"
								className="form-control"
								id="bookDescription"
								name="bookDescription"
								value={book.bookDescription}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="bookLink" className="form-label hotel-color">
								Book Link
							</label>
							<input
								type="text"
								className="form-control"
								id="bookLink"
								name="bookLink"
								value={book.bookLink}
								onChange={handleInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="bookKeywords" className="form-label hotel-color">
								Book Keywords
							</label>
							<input
								type="text"
								className="form-control"
								id="bookKeywords"
								name="bookKeywords"
								value={book.bookKeywords}
								onChange={handleInputChange}
							/>
						</div>
                        
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-books"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Book
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditBook