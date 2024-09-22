<h1 align="center">
  SaaS Boilerplate Setup and Guide
</h1>

### Introduction
We are using Meteor.js 3, MongoDB, Redis, React 18, Axios, Zod, Monti APM, Uniform, i18n, Tailwind and FlowBite UI.
There are small differences on our approach to Meteor.js. However, learning Meteor.js from its own guide will be
enough to contribute.

### Requirements
- Install NVM
- Install Node.js
- Install [Meteor.js](https://www.meteor.com/developers/install)
- Make sure you have [Docker](https://docs.docker.com/install) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.

### Packages
Soma of the important packages used in the project.
- alanning:roles
- jam:methods
- jam:offline
- uniforms
- universe:i18n
- zod

### Dev environment
Run mongodb (replica set) and redis for development environment

```bash 
npm run dev-env
```

When docker images are up, run the app

```bash 
npm run start
```

> The app should be available at  http://localhost:3001/

You can use `meteor` command to run the application with its build in mongodb, after disabling redis-oplog

To simulate production use

```bash 
npm run simulate-production
```

### Test
```bash 
npm run test
```

```bash 
npm run cypress
```

### Deploy
We are using mup to deploy, so check .deploy folder for details

```bash 
npm run deploy
```

### APM
Monti

### Roadmap
- [x] Login
- [x] Register
- [x] Roles
- [x] Logging
- [ ] Forgotten password
- [x] Profile page
- [x] Change password
- [x] 2FA
- [x] Dark mode
- [x] Page routing
- [x] Uniform with zod bridge
- [x] Basic form components written with tailwind
- [x] Price page
- [ ] Payment page
- [ ] License management 
- [x] Completely soft-remove
- [ ] Multi-tenant database partitioning
- [ ] Organization management
- [ ] User management
- [ ] Support page
- [ ] Headless CMS integration
- [x] RSS Fetcher
- [ ] Complex form components written with tailwind
- [ ] AWS s3 integration
- [ ] Job module
- [x] Performance monitoring with MontiAPM
- [x] Axios implementation
- [ ] Swagger implementation
- [x] PWA
