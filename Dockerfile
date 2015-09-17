FROM node:0.12.7

RUN mkdir /root/app
ADD . /root/app
RUN cd /root/app; npm install

EXPOSE 3000

WORKDIR /root/app
CMD ["/root/app/node_modules/.bin/forever","/root/app/server.js"]