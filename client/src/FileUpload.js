// FileUpload.js
import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ setFilename }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("https://aiplanetbackend.onrender.com/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        setFilename(result.filename);
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={handleFileChange} className="file-input form-control" />
            <button onClick={handleUpload} className="upload-button btn btn-primary mt-3">Upload</button>
        </div>
    );
};

export default FileUpload;
