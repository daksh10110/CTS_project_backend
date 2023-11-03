FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Set, Environment Variables, sample values given, need to be changed
ENV PORT=3001
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://myuser:secret@postgres:5432/mydatabase"
ENV SECRET="abcd"

EXPOSE $PORT

# Command to start the Node.js application
CMD ["npm", "start"]
