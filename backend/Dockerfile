FROM node:22-alpine

WORKDIR /app

# Install dependencies first to cache this layer
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
