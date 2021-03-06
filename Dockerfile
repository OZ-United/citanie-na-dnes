FROM node:14.15.1

RUN mkdir /root/app
ADD . /root/app
RUN cd /root/app; npm install; npm install -g bower; cd dashboard && bower install --allow-root

EXPOSE 3000

WORKDIR /root/app
CMD ["/root/app/node_modules/forever/bin/forever","/root/app/server.js"]
