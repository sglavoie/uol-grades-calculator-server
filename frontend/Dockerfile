FROM node:latest

# Install frontend stuff
COPY . /root/frontend/
RUN cd /root/frontend \
    && yarn install

WORKDIR /root/frontend
EXPOSE 3000

# FIXME: This is expected to start... and fail due to some calls having been updated
# in some npm packages.
CMD ["yarn", "start"]
