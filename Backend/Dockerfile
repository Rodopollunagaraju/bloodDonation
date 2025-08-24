FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
# Copy .env file
COPY .env ./

EXPOSE 5000
CMD ["npm", "start"]
# Use the official Node.js image as the base image
# FROM node:18
# Set the working directory in the container
# WORKDIR /app
# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
# Install the project dependencies
# RUN npm install
# Copy the rest of the application code to the working directory
# COPY . . .
# Expose the port that the application will run on
# EXPOSE 3000
# Define the command to run the application
# CMD ["npm", "start"]