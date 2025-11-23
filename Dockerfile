# --- STAGE 1: The Builder ---
# This stage prepares our application securely.
FROM node:18-alpine AS builder

# Fix OS vulnerabilities in the builder environment
RUN apk update && apk upgrade

# Set the working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Clean up dev dependencies for a smaller, more secure copy
RUN npm prune --production


# --- STAGE 2: The Final Production Image ---
# This is the minimal, secure image that will run in production.
FROM node:18-alpine

# Fix any OS vulnerabilities in the final base image
RUN apk update && apk upgrade

# Set the working directory
WORKDIR /app

# Copy the pruned production node_modules from the builder
COPY --from=builder /app/node_modules ./node_modules

# Copy the compiled application code from the builder
COPY --from=builder /app/dist ./dist

# ========================= THE DEFINITIVE FIX =========================
# The npm executable itself contains the vulnerability.
# Since our CMD uses 'node' directly, we don't need npm to run the app.
# By removing it entirely, we eliminate the vulnerability from the image.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
# ======================================================================

# Expose the application port
EXPOSE 3000

# Run the app directly with node, which works perfectly without npm.
CMD ["node", "dist/index.js"]