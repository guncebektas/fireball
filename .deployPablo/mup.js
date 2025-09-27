module.exports = {
  servers: {
    one: {
      host: '116.203.153.224',
      username: 'root',
      opts: {
        port: 22
      },
      pem: '~/.ssh/id_rsa',
    },
  },
  app: {
    name: 'rewarita',
    path: '../',
    docker: {
      image: 'zodern/meteor:latest',
      prepareBundle: true,
      useBuildKit: true,
      stopAppDuringPrepareBundle: false
    },
    servers: {
      one: {
        env: {
          HOST_NAME: 'host1',
          BRAND: 'pablo',
          HTTP_FORWARDED_COUNT: 1,
        }
      },
    },
    buildOptions: {
      serverOnly: true,
      // Set to true to skip building mobile apps
      // but still build the web.cordova architecture. (recommended)
      server: 'https://pablo.ritapos.com'
    },
    env: {
      ROOT_URL: 'https://pablo.ritapos.com',
      MONGO_URL: 'mongodb://rewarita:xer78pDeneme99*@178.62.199.21:27017,128.140.14.197:27017,88.198.201.90:27017/rewarita?replicaSet=rs0'
    },
    // lets you define which port to check after the deployment process, if it
    // differs from the meteor port you are serving
    // (like meteor behind a proxy/firewall) (optional)
    deployCheckPort: 80,
    enableUploadProgressBar: true
  },
  plugins: ['mup-redis'],
  redis: {
    // Server to run redis on.
    servers: {
      one: {}
    },
    // Version of redis. Add '-alpine' to use a much smaller docker image
    version: '3.2.10-alpine'
  }
};
