# Use the official Microsoft dev container image for Node.js 20
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Set arguments and environment variables. The APP_DIR is set to a common dev container path.
ARG APP_DIR=/workspaces/app
ENV APP_DIR=$APP_DIR
ENV PORT=3000
ENV HOST=0.0.0.0
# --- Set Node environment to development ---
ENV NODE_ENV=development
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/local/bin/playwright-browsers

# Switch to root to install system-level packages
USER root

# Install Python, fonts, and other dependencies your application needs
RUN apt-get update && apt-get install -y \
  # Python
  python3.10 \
  python3-pip \
  # Fonts
  fontconfig \
  fonts-freefont-ttf \
  fonts-gfs-neohellenic \
  fonts-indic \
  fonts-ipafont-gothic \
  fonts-kacst \
  fonts-liberation \
  fonts-noto-cjk \
  fonts-noto-color-emoji \
  fonts-roboto \
  fonts-thai-tlwg \
  fonts-ubuntu \
  fonts-wqy-zenhei \
  fonts-open-sans \
  && \
  # Clean up apt cache
  apt-get -qq clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Configure python alternatives
RUN update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1 && \
    update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# Switch back to the non-root 'node' user provided by the base image
USER node

# Set the working directory
WORKDIR ${APP_DIR}

# --- KEY CHANGE: Copy only package files to leverage Docker cache ---
COPY --chown=node:node package.json package-lock.json ./

# Install all npm dependencies
RUN npm install

# Install Playwright browsers and their OS dependencies.
# The --with-deps flag requires sudo, which is pre-configured in this base image.
RUN sudo ./node_modules/playwright-core/cli.js install --with-deps chromium

# --- KEY CHANGE: Use a command that keeps the container running ---
# This allows you to 'exec' into it and run dev scripts manually
CMD ["tail", "-f", "/dev/null"]