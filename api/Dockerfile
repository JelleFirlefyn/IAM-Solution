# Use the official Node.js 16 image.
# If you require a different version of Node.js, replace '16' with your desired version.
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the code if needed (uncomment if you have a build step).
# RUN npm run build

# The default command to run when starting the container.
CMD [ "node", "server.js" ]

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3001
