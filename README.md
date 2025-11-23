# MCP Trivia API Server

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express)
![Docker](https://img.shields.io/badge/Docker-Secured-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

A secure, containerized, and robust backend API that dynamically generates trivia questions on any given topic using the Google Gemini API.

This project is a demonstration of modern backend development practices, including API creation, security hardening, containerization with Docker, and a complete DevSecOps workflow.

## ✨ Key Features

-   **Dynamic Content Generation**: Leverages the Google Gemini API to create unique trivia questions on demand.
-   **Containerized Environment**: Uses a multi-stage Dockerfile for a lightweight, optimized, and secure production image.
-   **Security Hardened**: The final Docker image has been scanned and patched, with all High and Medium severity vulnerabilities resolved.
-   **TypeScript-Powered**: Built with TypeScript for a robust, scalable, and maintainable codebase.
-   **Secure Secret Management**: Follows best practices by handling API keys as runtime environment variables, not baked into the image.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing.

### Prerequisites

You must have the following software installed on your machine:
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)

### 🛠️ Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/your-username/mcp-trivia-server.git
    cd mcp-trivia-server
    ```

2.  **Set Up Environment Variables**
    This project requires a Google Gemini API key to function.

    -   Create a file named `.env` in the root of the project directory.
    -   Add your API key to this file. You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
        ```
        # .env file
        GOOGLE_API_KEY="your_actual_api_key_here"
        PORT=3000
        ```
    *This `.env` file is included in `.gitignore` and will not be committed to the repository.*

3.  **Build the Docker Image**
    This command builds the image from the `Dockerfile`, running all security patches and build steps.
    ```sh
    docker build -t mcp-trivia-server .
    ```

4.  **Run the Docker Container**
    This command starts the container, maps the port, and securely injects your API key from your local environment.
    ```sh
    docker run --rm -p 3000:3000 -e GOOGLE_API_KEY=$(grep GOOGLE_API_KEY .env | cut -d '=' -f2) --name trivia-app mcp-trivia-server
    ```
    The server will now be running and accessible at `http://localhost:3000`.

    *(Note: The `--rm` flag automatically removes the container when it is stopped.)*


## 💡 API Usage

You can interact with the API using any API client like Postman or a command-line tool like `curl`.

### Generate Questions

-   **Endpoint:** `/generate-questions`
-   **Method:** `POST`
-   **Description:** Generates a new set of trivia questions based on the topic provided in the request body.

**Example Request with `curl`:**
```sh
curl -X POST http://localhost:3000/generate-questions \
-H "Content-Type: application/json" \
-d '{
    "topic": "soccer"
}'
