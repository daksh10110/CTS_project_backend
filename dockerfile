FROM node:latest

RUN apt-get update && apt-get install -y net-tools

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Set Environment Variables (Update with actual credentials and URL)
ENV PORT=3001
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://myuser:secret@postgres:5432/mydatabase"
ENV SECRET="your_secret_key_here"

EXPOSE $PORT

CMD ["npm", "start"]
