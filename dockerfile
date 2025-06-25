# Stage 1: Build the application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm globally - your project uses pnpm-lock.yaml
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
