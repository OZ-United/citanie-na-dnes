# Citanie na dnes

Daily email service with new a reflection.

## Configuration

We use following environmental variables:

- **EMAIL_ADDRESS** - gmail address
- **EMAIL_PASSWORD** - email password
- **MONGO_DB_CONNECTION** - mongo db database connection url with username and password
- **PASSWORD** - frontend password
- **PORT** - running port, default *3000*


#### Gmail setting

You need to allow following gmail setting:

- https://www.google.com/settings/security/lesssecureapps
- https://accounts.google.com/DisplayUnlockCaptcha

## Deployment

We use docker container and docker-compose template, to start run

```sh
docker-compose -p united up -d
```

# License

The MIT License

Copyright (c) 2012 - 2015 Jan Antala, http://www.janantala.com
