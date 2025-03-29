# Use an official Node.js runtime as the base image
FROM node:22.14.0-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml) into the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application files into the container
COPY . .

# Build the TypeScript files
RUN pnpm run build

# Expose the port the app will run on
EXPOSE 5601

# Command to run the app (run the built file)
CMD ["node", "build/index.js"]
