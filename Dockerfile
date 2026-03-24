FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy everything
COPY . .

# Build the project
# This generates the .next folder AND compiles your server
RUN npm run build

# EXPOSE the port
EXPOSE 3000

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=3000

# USE NPM START INSTEAD OF DIRECT NODE CALL
# This ensures that 'cross-env' and other logic in your package.json triggers
CMD ["npm", "run", "start"]