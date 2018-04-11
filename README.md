# Wubcoin.com

Source code of wubcoin.com

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js](https://github.com/nuxt/nuxt.js).

# Deploy using Dokku

The application requires a database and diskspace for image uploads. Both can be easily provided with dokku plugins:

Set up the server (you have to do this only once):

```
dokku apps:create wubcoin
mkdir -p /var/lib/dokku/data/storage/wubcoin/uploads
chown -R 32767:32767 /var/lib/dokku/data/storage/wubcoin
dokku storage:mount wubcoin /var/lib/dokku/data/storage/wubcoin:/app/storage
dokku postgres:create wubcoin
dokku postgres:link wubcoin wubcoin
dokku config:set --no-restart wubcoin HOST=0.0.0.0 NODE_ENV=production DOKKU_LETSENCRYPT_EMAIL=my@email.com
dokku domains:add wubcoin mydomain.com
dokku letsencrypt wubcoin
```

On your local machine:

```
git remote add production dokku@[server-url]:wubcoin
git push production master
```