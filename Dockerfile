FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 3000

# Start NestJS in dev mode
CMD ["npm", "run", "start:dev"]
