import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { importBooks } from "../utils/ApiFunctions"; // Assuming this is your import statement
import * as XLSX from "xlsx";

const ImportBook = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setError(null);
        setSuccess(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".xlsx, .xls",
        maxFiles: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please upload a file.");
            return;
        }
    
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
    
                await importBooks(file); // Pass the file object directly
                setSuccess("Books imported successfully.");
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            setError("Error importing books.");
            console.error("Error importing books:", error);
        }
    };
    
    

    return (
        <div className="import-book-container">
            <h2>Import Books</h2>
            <form onSubmit={handleSubmit}>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the file here</p> : <p>Drag & drop an Excel file here, or click to select a file</p>}
                </div>
                {file && <p>Selected file: {file.name}</p>}
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit" className="submit-button">Import</button>
            </form>
        </div>
    );
};

export default ImportBook;
