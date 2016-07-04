FROM diko316/alnode

COPY . $PROJECT_ROOT

RUN npm install -dd -y && \
    ln -s $PROJECT_ROOT/node_modules/mocha/bin/mocha /usr/local/bin/mocha
    



