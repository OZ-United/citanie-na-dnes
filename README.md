# Citanie na dnes

Daily email service with new a reflection.

Stack: node.js, mongoDB, gmail SMTP

## API

### User

    GET /users
    - query all users

    POST /users
    - create a new user
    - post data: 
      {"name": "Vincent Vega", "email": "vincent.vega@gmail.com"}
    - return data: 
      {"userId": "51c7696ffd9a472912000001", "name": "Vincent Vega", "email": "vincent.vega@gmail.com", "gravatar": "http://gravatar.com/avatar/dee5457a060c1acab41e0d22a9c67f30?s=50&amp;d=mm"}

    PUT /users/:userId
    - update user
    - post data: 
      {"userId": "51c7696ffd9a472912000001", "name": "Jules Winnfield", "email": "vincent.vega@gmail.com"}
    - return data: 
      {"userId": "51c7696ffd9a472912000001", "name": "Jules Winnfield", "email": "vincent.vega@gmail.com", "gravatar": "http://gravatar.com/avatar/dee5457a060c1acab41e0d22a9c67f30?s=50&amp;d=mm"}

    DELETE /users/:userId
    - remove a user

### Reflection

    GET /reflections
    - query all reflections

    GET /reflections/fetch
    - fetch a new reflection

    GET /reflections/:reflectionId
    - get a reflection

    DELETE /reflections/:reflectionId
    - remove a reflection

### Notification

    POST /notifications/reflections/last
    - send an email with the latest reflection to all users

    POST /notifications/reflections/:reflectionId
    - send an email with a reflection to all users


## config.js

You can create a configuration file with a sender gmail email address in a root directory.

    var config = {};
    
    config.email = 'citanienadnes@gmail.com';
    config.emailpass = 'password';
    
    module.exports = config;

# License

The MIT License

Copyright (c) 2013 Jan Antala, https://github.com/janantala
