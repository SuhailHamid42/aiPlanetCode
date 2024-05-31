# See the website live at (https://aiplanetpdf.netlify.app/)

# Fullstack PDF Q&A Application

## Objective
Develop a full-stack application that allows users to upload PDF documents and ask questions about their content.

## Technologies
- **Backend**: Node.js, Express.js
- **NLP**: OpenAI API
- **Frontend**: React.js
- **Database**: MongoDB
- **File Storage**: Local filesystem

## Features
- **PDF Upload**: Users can upload PDF documents.
- **Ask Questions**: Users can ask questions related to the content of uploaded PDFs.
- **Display Answers**: Answers to questions are displayed to the user.

## Setup Instructions
### Prerequisites
- Node.js
- MongoDB
- NPM

### Backend Setup
1. Clone the repository and navigate to the project directory.
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2. Install dependencies.
    ```bash
    npm install
    ```
3. Create a `.env` file and add your OpenAI API key.
    ```env
    OPENAI_API_KEY=your_openai_api_key
    MONGODB_URL=your_mongodb_url
    ```
4. Start MongoDB and the backend server.
    ```bash
    mongod
    npm start
    ```

### Frontend Setup
1. Navigate to the client directory.
    ```bash
    cd client
    ```
2. Install dependencies and start the frontend server.
    ```bash
    npm install
    npm start
    ```

## Usage
1. Open http://localhost:3000 in your web browser.
2. Upload a PDF document.
3. Ask a question related to the uploaded PDF.
4. View the answer.

## API Endpoints
- **Upload PDF**
  - **POST** /upload
  - **Description**: Uploads a PDF document.
  - **Request**: multipart/form-data with a file field named file.
  - **Response**: JSON with the filename.
- **Ask Question**
  - **POST** /ask
  - **Description**: Answers a question based on the content of an uploaded PDF.
  - **Request**: JSON with filename and question.
  - **Response**: JSON with the question and answer.

