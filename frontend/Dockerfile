FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite development server
# Note: For production, we would build the static files and serve with Nginx.
# For syllabus/learning purposes, we will run the dev server inside the container first.
CMD ["npm", "run", "dev", "--", "--host"]
