FROM mcr.microsoft.com/devcontainers/javascript-node:24

# Install system fonts and dependencies (mirroring Dockerfile)
RUN apt-get update && \
    echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections && \
    apt-get -y -qq install software-properties-common && \
    apt-add-repository "deb http://archive.canonical.com/ubuntu $(lsb_release -sc) partner" && \
    apt-get -y -qq --no-install-recommends install \
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
      fonts-open-sans && \
    fc-cache -f -v && \
    apt-get -qq clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy fonts from workspace if needed (optional, uncomment if you want to copy local fonts)
# COPY ../fonts/* /usr/share/fonts/truetype/


# Install Chromium and run build steps as in main Dockerfile
RUN ./node_modules/playwright-core/cli.js install --with-deps chromium && \
    npm run build && \
    npm run build:function && \
    npm prune production && \
    npm run install:debugger && \
    fc-cache -f -v && \
    apt-get -qq clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/fonts/truetype/noto

# Default user is node (from base image)
