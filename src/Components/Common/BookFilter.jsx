import React, { useState } from "react"

const BookFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		const filteredBooks = data.filter((book) =>
			book.bookType.toLowerCase().includes(selectedType.toLowerCase())
		)
		setFilteredData(filteredBooks)
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const bookTypes = ["", ...new Set(data.map((book) => book.bookType))]

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="book-type-filter">
				FIlter books by type
			</span>
			<select
				className="form-select"
				aria-label="book type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a book type to filter....</option>
				{bookTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="button" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
	)
}
export default BookFilter