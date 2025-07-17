module.exports = {
  servers: {
    one: {
      host: '#',
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
          HTTP_FORWARDED_COUNT: 1,
        }
      },
    },
    buildOptions: {
      serverOnly: true,
      // Set to true to skip building mobile apps
      // but still build the web.cordova architecture. (recommended)
      server: '#'
    },
    env: {
      ROOT_URL: '#',
      MONGO_URL: '#'
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
