// QuestionForm.js
import React, { useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ filename }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = async () => {
        const response = await fetch("https://aiplanetbackend.onrender.com/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filename: filename,
                question: question,
            }),
        });

        const result = await response.json();
        setAnswer(result.answer);
    };

    return (
        <div className="question-form">
            <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Ask a question"
                className="question-input form-control"
            />
            <button onClick={handleAskQuestion} className="ask-button btn btn-success mt-3">Ask</button>
            {answer && (
                <div className="answer-section mt-4">
                    <h3 className="answer-heading">Answer:</h3>
                    <p className="answer-text">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionForm;
