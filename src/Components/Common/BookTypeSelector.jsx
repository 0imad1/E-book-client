import React, { useState, useEffect } from "react";
import { getBookTypes } from "../utils/ApiFunctions";

const BookTypeSelector = ({ handleBookInputChange, newBook }) => {
  const [bookTypes, setBookTypes] = useState([]);
  const [showNewBookTypeInput, setShowNewBookTypeInput] = useState(
    false
  );
  const [newBookType, setNewBookType] = useState("");

  useEffect(() => {
    getBookTypes().then((data) => {
      setBookTypes(data);
    });
  }, []);

  const handleNewBookTypeInputChange = (e) => {
    setNewBookType(e.target.value);
  };

  const handleAddNewBookType = () => {
    if (newBookType.trim() !== "") {
        setBookTypes([...bookTypes, newBookType.trim()]);
        setNewBookType("");
        setShowNewBookTypeInput(false);
    }
  };

  return (
    <>
      {bookTypes.length > 0 && (
        <div>
         <select
            required
            className="form-select"
            name="bookType"
            onChange={(e) => {
                const selectedType = e.target.value;
                if (selectedType === "Add New") {
                    setShowNewBookTypeInput(true);
                } else {
                    handleBookInputChange(e); // This will set the bookType in newBook state
                    setNewBook((prev) => ({ ...prev, bookType: selectedType })); // Update the bookType
                }
            }}
            value={newBook.bookType} // Ensure it reflects the current bookType
        >
            <option value="">Select a book type</option>
            <option value={"Add New"}>Add New</option>
            {bookTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
         </select>

          {showNewBookTypeInput && (
            <div className="mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter New Book Type"
                  value={newBookType}
                  onChange={handleNewBookTypeInputChange}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddNewBookType}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BookTypeSelector;
