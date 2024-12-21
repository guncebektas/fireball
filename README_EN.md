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
- Install NPM
- Install [Meteor.js](https://www.meteor.com/developers/install)
- Make sure you have [Docker](https://docs.docker.com/install) and [Docker Compose](https://docs.docker.com/compose/install/) installed and operational.

## Installation
First of all clone the repository and create your own settings.json file from settings,example.json

```bash

### Install dev environment
Run mongodb (replica set) and redis for development environment.
You can meet these requirements with a single command.

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

### Packages
Soma of the important packages used in the project.
- alanning:roles
- jam:methods
- jam:pub-sub
- jam:offline
- uniforms
- universe:i18n
- zod

### APM
Monti

### Features & Roadmap
- [ ] Authentication
  - [x] Login
  - [x] Register
  - [x] Roles
  - [x] Forgotten password reset
  - [x] Change password
  - [x] 2FA
- [x] Logging
- [x] UI/UX
  - [x] Tailwind
  - [x] Flowbite react
  - [x] Mobile-first
  - [x] Responsive
  - [x] Dark mode
- [ ] Forms
  - [x] Uniform with zod bridge
  - [x] Basic form (uniform) components written with Tailwind
  - [x] Basic forms of uniform with translation support
  - [ ] Complex form components written with Tailwind
- [ ] Data grid (simple-datatables) component
  - [x] Client side component
  - [ ] Server side component
- [ ] Pages
  - [x] Page routing
  - [x] Home page
  - [ ] Payment page 
  - [x] Profile page
  - [x] Price page
  - [x] Support page
- [ ] Management
  - [x] User management
  - [x] Role management
  - [ ] License management 
  - [ ] Organization management
  - [ ] Headless CMS integration
  - [x] RSS Reader
- [ ] Database
  - [x] Completely soft-remove
  - [ ] Multi-tenant database partitioning
- [ ] Infrastructure
  - [x] Decoupled module structure
  - [x] Axios implementation
  - [ ] Swagger implementation
  - [x] Cron job module
  - [x] Email sending
  - [x] Migration module
  - [x] Performance monitoring with MontiAPM
  - [x] AWS s3 integration
  - [x] PWA
  - [x] Multi-lingual
- [ ] Methods
  - [x] Validated by zod schemas
  - [ ] CQRS (Command and Query buses)
