MCP Trivia API Server
![alt text](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![alt text](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![alt text](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express)
![alt text](https://img.shields.io/badge/Docker-Secured-2496ED?style=for-the-badge&logo=docker)
![alt text](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)
A secure, containerized, and robust backend API that dynamically generates trivia questions on any given topic using the Google Gemini API.
This project is a demonstration of modern backend development practices, including API creation, security hardening, containerization with Docker, and a complete DevSecOps workflow.
✨ Key Features
Dynamic Content Generation: Leverages the Google Gemini API to create unique trivia questions on demand.
Containerized Environment: Uses a multi-stage Dockerfile for a lightweight, optimized, and secure production image.
Security Hardened: The final Docker image has been scanned and patched, with all High and Medium severity vulnerabilities resolved.
TypeScript-Powered: Built with TypeScript for a robust, scalable, and maintainable codebase.
Secure Secret Management: Follows best practices by handling API keys as runtime environment variables, not baked into the image.
🚀 Getting Started
This guide has two paths. Choose the one that fits your needs:
For Users: For those who just want to run the application.
For Developers: For those who want to modify the source code.
🏃 For Users (Running the Application)
These instructions are the fastest way to get the server running using a pre-built, official image from Docker Hub.
Prerequisites
Docker
1. Create the Environment File
This project requires a Google Gemini API key to function.
Create a folder on your machine for this project.
Inside that folder, create a file named .env.
Add your API key to this file. You can obtain a key from Google AI Studio.
code
Ini
# .env file
GOOGLE_API_KEY="your_actual_api_key_here"
PORT=3000
2. Run the Application
Run the following command from the same directory where your .env file is located. This will download the official image from Docker Hub and start the container.
code
Sh
docker run --rm -p 3000:3000 --env-file .env --name trivia-app your-dockerhub-username/mcp-trivia-server
(Note: You will need to build and push your image to a Docker Hub repository for this command to work for others. Replace your-dockerhub-username with your actual username.)
The server will now be running and accessible at http://localhost:3000. You can now proceed to the API Usage section.
🛠️ For Developers (Contributing to the Code)
These instructions are for developers who want to clone the source code to modify, debug, or contribute to it.
Prerequisites
Git
Docker
1. Clone the Repository```sh
git clone https://github.com/Aliankhann/mcp-trivia-server.git
cd mcp-trivia-server
code
Code
#### 2. Set Up Environment Variables
-   Create a file named `.env` in the root of the project directory.
-   Add your API key to this file, which you can get from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```ini
    # .env file
    GOOGLE_API_KEY="your_actual_api_key_here"
    PORT=3000
    ```
*This `.env` file is included in `.gitignore` and will not be committed to the repository.*

#### 3. Build the Docker Image
This command builds a local image from the `Dockerfile` in the current directory.
```sh
docker build -t mcp-trivia-server .```

#### 4. Run the Docker Container
This command starts the container from the image you just built, mapping the port and securely injecting your environment variables.
```sh
docker run --rm -p 3000:3000 --env-file .env --name trivia-app mcp-trivia-server
The server will now be running and accessible at http://localhost:3000.
💡 API Usage
You can interact with the API using any API client like Postman or a command-line tool like curl.
Generate Questions
Endpoint: /generate-questions
Method: POST
Description: Generates a new set of trivia questions based on the topic provided in the request body.
Example Request with curl:
code
Sh
curl -X POST http://localhost:3000/generate-questions \
-H "Content-Type: application/json" \
-d '{
    "topic": "soccer"
}'
