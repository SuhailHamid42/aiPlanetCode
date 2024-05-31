// App.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import QuestionForm from './QuestionForm';
import './App.css';

function App() {
    const [filename, setFilename] = useState("");

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg">
                <h1 className="heading text-center">Upload PDF</h1>
                <FileUpload setFilename={setFilename} />
                {filename && (
                    <div className="question-section mt-4">
                        <h2 className="sub-heading text-center">Ask Questions</h2>
                        <QuestionForm filename={filename} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
