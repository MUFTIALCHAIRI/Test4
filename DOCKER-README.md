# Docker Guide for Comot.in App

This guide explains how to run the Comot.in application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system (usually comes with Docker Desktop)

## Running the Application

### Using Docker Compose (recommended)

1. From the project root directory, run:

```bash
docker-compose up
```

This will build the Docker image and start the container. The app will be available at http://localhost:3000.

To run in detached mode (in the background):

```bash
docker-compose up -d
```

To stop the containers:

```bash
docker-compose down
```

### Using Docker directly

1. Build the Docker image:

```bash
docker build -t comot-in-app .
```

2. Run the container:

```bash
docker run -p 3000:80 -d --name comot-in comot-in-app
```

The app will be available at http://localhost:3000.

To stop the container:

```bash
docker stop comot-in
```

## Environment Variables

The Docker setup supports the following environment variables:

- `VITE_API_BASE_URL`: The base URL for API requests (default: http://localhost:8000)
- `VITE_LOGIN_ENDPOINT`: The endpoint for login (default: /login)
- `VITE_REGISTER_ENDPOINT`: The endpoint for registration (default: /register)
- `VITE_USER_ENDPOINT`: The endpoint for user data (default: /users/me)

You can set these variables in a `.env` file or pass them directly to Docker Compose:

```bash
VITE_API_BASE_URL=http://custom-api.example.com docker-compose up
```

## Production Deployment

For production, consider:

1. Using a production-grade Docker image
2. Setting up HTTPS with certificates
3. Configuring proper secrets management
4. Setting up monitoring and logging

## Troubleshooting

If you encounter issues:

1. Check Docker logs: `docker logs comot-in`
2. Ensure ports are not in use by other services
3. Verify network connectivity to backend services
4. Check environment variables are correctly set
