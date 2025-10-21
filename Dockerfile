# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backEnd/package*.json ./backEnd/
COPY frontEnd/package*.json ./frontEnd/

# Install dependencies
RUN npm install
RUN cd backEnd && npm install
RUN cd frontEnd && npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start:backend"]