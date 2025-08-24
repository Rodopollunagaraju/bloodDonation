FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 5173
CMD ["npm", "run", "dev"]
# Use the official Node.js image as the base image
# FROM node:18-alpine
# Set the working directory in the container
# WORKDIR /app
# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
# Install the project dependencies
# RUN npm install
# Copy the rest of the application code to the working directory
# COPY . . .
# Expose the port that the application will run on
# EXPOSE 5173
# Define the command to run the application
# CMD ["npm", "run", "dev"]