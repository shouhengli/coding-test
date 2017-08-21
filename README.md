# Social Network Data Visualisation Coding Test

The original requirements and files are put into the ~original~ directory.

### Prerequisite
* [Yarn](https://yarnpkg.com/)
* Clone or unzip the repo

### Getting started
```bash
yarn install
```
 

Start the server:

```bash
yarn  server
```

Visit http://localhost:3000 in a browser

### Developing

This application is written using a TDD approach. Therefore it is important to insure that when changes are being made, suitable tests are created and/or modified. A test runner can be started to listen for changes and re-run the test suite when changes occur.

##### Server Dev

Server is written using Express and Node.js.

```bash
yarn server-watch
```
This will run through the test suite and if all green will start the server.

To run the server in development mode (un-bundled) use:

```bash
yarn server-start
```

##### Client Dev

Client is written using Ember.js and [Ember-Cli](https://ember-cli.com/).

```bash
yarn client-watch
```
This will run through the test suite. By default the tests are run again both PhantoJs and Chrome.

```bash
yarn client-coverage
```
This will produce test coverage reports in HTML, they can be viewed in directory `client/coverage`

```bash
yarn client-build
```
This will produce bundled, "babelized" and minified distrubutable scripts in `server/assets`, these files will be served statically by server.

To run the client in development mode (un-bundled) use:
```bash
yarn client-start
```
This will spin up a liveload server with port 4200.
