# MCP Trivia API Server

![Node.js](https://img-shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)![TypeScript](https://img-shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)![Express.js](https://img-shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express)![Docker](https://img-shields.io/badge/Docker-Secured-2496ED?style=for-the-badge&logo=docker)![License](https://img-shields.io/badge/License-ISC-blue?style=for-the-badge)

A secure, containerized, and robust backend API that dynamically generates trivia questions on any given topic using the Google Gemini API.

This project is a demonstration of modern backend development practices, including API creation, security hardening, containerization with Docker, and a complete DevSecOps workflow.

---

## ✨ Key Features

-   **Dynamic Content Generation**: Leverages the Google Gemini API to create unique trivia questions on demand.
-   **Containerized Environment**: Uses a multi-stage Dockerfile for a lightweight, optimized, and secure production image.
-   **Security Hardened**: The final Docker image has been scanned and patched, resolving all High and Medium severity vulnerabilities.
-   **TypeScript-Powered**: Built with TypeScript for a robust, scalable, and maintainable codebase.
-   **Secure Secret Management**: Follows best practices by handling API keys as runtime environment variables, never baked into the image.

---

## 📖 Table of Contents

-   [**Running the Application (Quick Start)**](#-running-the-application-quick-start): For users who just want to run the server.
-   [**Developing and Contributing**](#-developing-and-contributing): For developers who want to modify the source code.
-   [**API Usage**](#-api-usage): How to interact with the API once it's running.

---

## 🚀 Running the Application (Quick Start)

This is the fastest way to get the server running using a pre-built, official image from Docker Hub.

#### Prerequisites
-   [Docker](https://www.docker.com/products/docker-desktop/)

#### 1. Create Environment File

The server requires a Google Gemini API key to function.

-   Create a new, empty folder on your machine.
-   Inside that folder, create a file named `.env`.
-   Add your API key to this file. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```ini
    # .env
    GOOGLE_API_KEY="your_actual_api_key_here"
    PORT=3000
    ```

#### 2. Run the Application

Execute the following command from the same directory where your `.env` file is located. This will download the official image and start the container.

```sh
docker run --rm -p 3000:3000 --env-file .env --name trivia-app aliankhann/mcp-trivia-server
```
*> **Note**: For this to work for others, you must first [build and push your image to a Docker Hub repository](https://docs.docker.com/docker-hub/repos/) under the public name `aliankhann/mcp-trivia-server`.*

The server is now running at `http://localhost:3000`. You can now proceed to the [API Usage](#-api-usage) section.

---

## 🛠️ Developing and Contributing

These instructions are for developers who want to clone the source code to modify, debug, or contribute to it.

#### Prerequisites
-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/)

#### 1. Clone the Repository
```sh
git clone https://github.com/Aliankhann/mcp-trivia-server.git
cd mcp-trivia-server
```

#### 2. Set Up Environment Variables
Create a `.env` file in the root of the project and add your Google Gemini API key.

```ini
# .env
GOOGLE_API_KEY="your_actual_api_key_here"
PORT=3000
```
*> This file is listed in `.gitignore` and will not be committed to your repository.*

#### 3. Build the Local Docker Image
This command builds an image from the `Dockerfile` in the current directory.
```sh
docker build -t mcp-trivia-server .
```

#### 4. Run the Local Container
This command starts a container from the image you just built locally.
```sh
docker run --rm -p 3000:3000 --env-file .env --name trivia-app mcp-trivia-server
```
The server is now running at `http://localhost:3000`.

---

## 💡 API Usage

You can interact with the API using any API client or command-line tool like `curl`.

### Generate Questions

-   **Endpoint:** `POST /generate-questions`
-   **Description:** Generates a new set of trivia questions based on the topic provided in the request body.

#### Example Request
```sh
curl -X POST http://localhost:3000/generate-questions \
-H "Content-Type: application/json" \
-d '{
    "topic": "The Solar System"
}'
```

---

## 📜 License

This project is licensed under the **ISC License**.
